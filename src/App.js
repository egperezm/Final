import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [form, setForm] = useState({
    nombreCliente: "",
    fechaInicio: "",
    fechaFin: "",
    tipoHabitacion: "Sencilla",
  });

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reservas");
      setReservas(response.data);
    } catch (error) {
      console.error("Error fetching reservas:", error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reservas", form);
      alert("Reserva creada exitosamente");
      fetchReservas();
      setForm({
        nombreCliente: "",
        fechaInicio: "",
        fechaFin: "",
        tipoHabitacion: "Sencilla",
      });
    } catch (error) {
      console.error("Error creando reserva:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta reserva?")) {
      try {
        await axios.delete(`http://localhost:8080/api/reservas/${id}`);
        alert("Reserva eliminada");
        fetchReservas();
      } catch (error) {
        console.error("Error eliminando reserva:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Gestión de Reservas de Hotel</h1>
      <div className="form-container">
        <h2>Registrar Reserva</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombreCliente"
            placeholder="Nombre del cliente"
            value={form.nombreCliente}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fechaInicio"
            placeholder="Fecha de inicio"
            value={form.fechaInicio}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fechaFin"
            placeholder="Fecha de fin"
            value={form.fechaFin}
            onChange={handleChange}
            required
          />
          <select
            name="tipoHabitacion"
            value={form.tipoHabitacion}
            onChange={handleChange}
            required
          >
            <option value="Sencilla">Sencilla</option>
            <option value="Doble">Doble</option>
            <option value="Suite">Suite</option>
          </select>
          <button type="submit">Registrar</button>
        </form>
      </div>

      <div className="list-container">
        <h2>Reservas Existentes</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Tipo Habitación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.nombreCliente}</td>
                <td>{reserva.fechaInicio}</td>
                <td>{reserva.fechaFin}</td>
                <td>{reserva.tipoHabitacion}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(reserva.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";

const ReservaForm = () => {
  const [reserva, setReserva] = useState({
    nombreCliente: "",
    fechaInicio: "",
    fechaFin: "",
    tipoHabitacion: "Sencilla",
  });

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/reservas", reserva)
      .then(() => alert("Reserva creada exitosamente"))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombreCliente" onChange={handleChange} placeholder="Nombre del cliente" />
      <input name="fechaInicio" type="date" onChange={handleChange} />
      <input name="fechaFin" type="date" onChange={handleChange} />
      <select name="tipoHabitacion" onChange={handleChange}>
        <option value="Sencilla">Sencilla</option>
        <option value="Doble">Doble</option>
        <option value="Suite">Suite</option>
      </select>
      <button type="submit">Registrar Reserva</button>
    </form>
  );
};

export default ReservaForm;

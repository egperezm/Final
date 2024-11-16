import React, { useEffect, useState } from "react";
import axios from "axios";

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/reservas")
      .then((response) => setReservas(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Tipo Habitación</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map((reserva) => (
          <tr key={reserva.id}>
            <td>{reserva.nombreCliente}</td>
            <td>{reserva.fechaInicio}</td>
            <td>{reserva.fechaFin}</td>
            <td>{reserva.tipoHabitacion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservasList;

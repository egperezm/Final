package com.hotel.reservas.Modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity

public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreCliente;

    @Column(nullable = false)
    private LocalDate fechaInicio;

    @Column(nullable = false)
    private LocalDate fechaFin;

    @Column(nullable = false)
    private String tipoHabitacion;

    // Getters y Setters
}

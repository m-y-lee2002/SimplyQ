package com.simplyq.server.Entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//Lets Springboot know that this Class corresponds with a table
@Entity
@Data
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="uid")
    private Integer uid;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="name")
    private String name;

    @Column(name="password")
    private String password;

    @Column(name="inQueue")
    private Boolean inQueue;
}

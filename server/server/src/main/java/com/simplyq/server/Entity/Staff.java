package com.simplyq.server.Entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//Lets Springboot know that this Class corresponds with a table
@Entity
@Data
@Table(name = "staff")
@NoArgsConstructor
@AllArgsConstructor


public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sid")
    private Integer sid;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

}

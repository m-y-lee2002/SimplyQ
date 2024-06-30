package com.simplyq.server.Entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ValueGenerationType;


//Lets Springboot know that this Class corresponds with a table
@Entity
@Data
@Table(name = "queue")
@NoArgsConstructor
@AllArgsConstructor

public class Queue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "queuePosition")
    private Integer queuePosition;

    @Column(name = "uid")
    private Integer uid;

}

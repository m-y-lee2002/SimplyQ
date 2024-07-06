package com.simplyq.server.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "queue")
@NoArgsConstructor
@AllArgsConstructor
public class Queue {
    @Id
    @Column(name = "queuePosition")
    private Integer queuePosition;

    @Column(name = "uid")
    private Integer uid;
}

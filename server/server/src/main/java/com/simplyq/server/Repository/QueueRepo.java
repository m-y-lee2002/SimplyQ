package com.simplyq.server.Repository;

import com.simplyq.server.Entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueueRepo extends JpaRepository<Queue,Integer> {
}

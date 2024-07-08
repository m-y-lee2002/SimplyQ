package com.simplyq.server.Repository;

import com.simplyq.server.Entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QueueRepo extends JpaRepository<Queue,Integer> {
    @Query(value= "SELECT MAX(queue.queuePosition) FROM queue", nativeQuery = true)
    Integer getMaxQueuePosition();

    void deleteByUid(Integer uid);

    void deleteByQueuePosition(Integer queuePosition);
}

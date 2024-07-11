package com.simplyq.server.Service;

import com.simplyq.server.Entity.Queue;
import com.simplyq.server.Repository.QueueRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueueService {

    @Autowired
    private QueueRepo queueRepo;

    public Queue saveQueue(Queue queue){
        try {
            return queueRepo.save(queue);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violations (e.g., unique constraint violations)
            throw new RuntimeException("Failed to save user due to data integrity violation: " + e.getMessage());
        } catch (Exception e) {
            // Handle other unexpected exceptions
            throw new RuntimeException("Failed to save user: " + e.getMessage());
        }
    }
    public List<Queue> getAllQueues(){
        return queueRepo.findAll();
    }
    public Integer getLastUserPosition(){
        return queueRepo.getMaxQueuePosition();
    }
    @Transactional
    public Boolean removeQueueById(Integer uid){
        try {
            queueRepo.deleteByUid(uid);
            return true;
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violations (e.g., unique constraint violations)
            throw new RuntimeException("Failed to delete user due to data integrity violation: " + e.getMessage());
        } catch (Exception e) {
            // Handle other unexpected exceptions
            throw new RuntimeException("Failed to delete user: " + e.getMessage());
        }
    }

//    @Transactional
//    public Boolean removeQueueByPosition(Integer queuePosition){
//        try {
//            queueRepo.deleteByQueuePosition(queuePosition);
//            return true;
//        } catch (DataIntegrityViolationException e) {
//            // Handle data integrity violations (e.g., unique constraint violations)
//            throw new RuntimeException("Failed to delete user due to data integrity violation: " + e.getMessage());
//        } catch (Exception e) {
//            // Handle other unexpected exceptions
//            throw new RuntimeException("Failed to delete user: " + e.getMessage());
//        }
//    }
}

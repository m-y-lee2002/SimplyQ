package com.simplyq.server.Controller;
import com.simplyq.server.Entity.Queue;
import com.simplyq.server.Entity.User;
import com.simplyq.server.Service.QueueService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000",  allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
@RestController
public class QueueController {
    @Autowired
    private QueueService queueService;

    @PostMapping("/api/queue/post")
    public ResponseEntity<Queue> postQueue(@RequestBody Queue queue){
        try {
            Queue savedQueue = queueService.saveQueue(queue);
            return ResponseEntity.ok(savedQueue);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/api/get/queue/getAll")
    public ResponseEntity<List<Queue>> getQueue(){
        try{
            List<Queue> savedQueue= queueService.getAllQueues();
            return ResponseEntity.ok(savedQueue);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/api/get/queue/getMaxPosition")
    public ResponseEntity<Integer> getMaxPosition(){
        try{
            Integer position= queueService.getLastUserPosition();

            return ResponseEntity.ok(position);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/api/post/queue/addToQueue")
    public ResponseEntity<Queue> postUserToQueue(@RequestBody Queue queue){
        try {
            Queue savedQueue = queueService.saveQueue(queue);
            return ResponseEntity.ok(savedQueue);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/api/delete/queue/removeFromQueue/{uid}")
    public ResponseEntity<Boolean> deleteUserFromQueue(@PathVariable Integer uid){
        try{
            Boolean savedQueue= queueService.removeQueueById(uid);
            return ResponseEntity.ok(savedQueue);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

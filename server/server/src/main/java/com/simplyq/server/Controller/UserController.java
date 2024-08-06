package com.simplyq.server.Controller;

import com.simplyq.server.Entity.User;
import com.simplyq.server.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class    UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/post")
    public ResponseEntity<User> postUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/api/post/registerUser")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/api/get/verifyUserLogin/{email}")
    public ResponseEntity<User> verifyUserLogin(@PathVariable String email) {
        try {
            User savedUser = userService.getUserByEmail(email);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/api/get/verifyUserEmail/{email}")
    public Boolean verifyUserEmail(@PathVariable String email) {
        try {
            User savedUser = userService.getUserByEmail(email);
            if(savedUser == null){
                return true;
            }else{
                return false;
            }
           // return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            System.out.println(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
            return false;
        }
    }
    @PutMapping("/api/put/user/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        try{
            User savedUser= userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/api/get/user/getUser/{uid}")
    public ResponseEntity<User> getUser(@PathVariable Integer uid){
        try{
            User savedUser = userService.getUserByUid(uid);
            return ResponseEntity.ok(savedUser);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

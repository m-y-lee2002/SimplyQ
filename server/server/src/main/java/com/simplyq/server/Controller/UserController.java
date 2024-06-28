package com.simplyq.server.Controller;

import com.simplyq.server.Entity.User;
import com.simplyq.server.Service.UserService;
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
}

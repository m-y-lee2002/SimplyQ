package com.simplyq.server.Controller;

import com.simplyq.server.Entity.Staff;
import com.simplyq.server.Entity.User;
import com.simplyq.server.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class StaffController {
    @Autowired
    private StaffService staffService;

    @PostMapping("/api/staff/post")
    public ResponseEntity<Staff> postStaff(@RequestBody Staff staff){
        try {
            Staff savedStaff = staffService.saveStaff(staff);
            return ResponseEntity.ok(savedStaff);
        } catch (RuntimeException e) {
            // Log the exception or handle it as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/api/get/staff/verifyStaffLogin/{email}")
    public ResponseEntity<Staff> verifyStaff(@PathVariable String email){
        try{
            Staff savedStaff = staffService.getStaffByEmail(email);
            return ResponseEntity.ok(savedStaff);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

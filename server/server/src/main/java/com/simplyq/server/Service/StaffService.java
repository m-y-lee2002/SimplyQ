package com.simplyq.server.Service;

import com.simplyq.server.Entity.Staff;
import com.simplyq.server.Entity.User;
import com.simplyq.server.Repository.QueueRepo;
import com.simplyq.server.Repository.StaffRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    @Autowired
    private StaffRepo staffRepo;

    public Staff saveStaff(Staff staff) {
        try {
            return staffRepo.save(staff);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violations (e.g., unique constraint violations)
            throw new RuntimeException("Failed to save user due to data integrity violation: " + e.getMessage());
        } catch (Exception e) {
            // Handle other unexpected exceptions
            throw new RuntimeException("Failed to save user: " + e.getMessage());
        }
    }
    public Staff getStaffByEmail(String email){
        try{
            return staffRepo.findStaffByEmail(email);
        }catch(Exception e){
            throw new RuntimeException( e.getMessage());
        }
    }

}

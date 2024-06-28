package com.simplyq.server.Service;

import com.simplyq.server.Entity.User;
import com.simplyq.server.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User saveUser(User user) {
        try {
            return userRepo.save(user);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violations (e.g., unique constraint violations)
            throw new RuntimeException("Failed to save user due to data integrity violation: " + e.getMessage());
        } catch (Exception e) {
            // Handle other unexpected exceptions
            throw new RuntimeException("Failed to save user: " + e.getMessage());
        }
    }
    public User getUserByEmail(String email){
        return userRepo.findByEmail(email);
    }
}

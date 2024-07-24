package com.simplyq.server.Repository;
import com.simplyq.server.Entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepo extends JpaRepository<Staff, Integer> {
    Staff findStaffByEmail(String email);
}

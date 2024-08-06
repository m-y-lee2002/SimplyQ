package com.simplyq.server.Repository;
import com.simplyq.server.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
    User findByEmail(String email);
    User findUserByUid(Integer uid);
}

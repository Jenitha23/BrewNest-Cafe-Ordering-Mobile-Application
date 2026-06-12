// repository/UserRepository.java
package com.brewnest.repository;

import com.brewnest.entity.Role;
import com.brewnest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailAndRole(String email, Role role);
    
    boolean existsByEmail(String email);
    
    Optional<User> findByEmailAndIsActiveTrue(String email);
    
    Optional<User> findByEmailAndRoleAndIsActiveTrue(String email, Role role);
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.lastLogin = :lastLogin WHERE u.email = :email")
    void updateLastLogin(@Param("email") String email, @Param("lastLogin") LocalDateTime lastLogin);
    
    long countByRole(Role role);
}
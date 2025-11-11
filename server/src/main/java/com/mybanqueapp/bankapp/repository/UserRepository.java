package com.mybanqueapp.bankapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mybanqueapp.bankapp.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    // You can define custom queries if needed
   	Users findByEmail(String email); // corrected

}
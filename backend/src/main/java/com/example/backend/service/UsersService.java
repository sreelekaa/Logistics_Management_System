package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.model.Users;
import com.example.backend.repository.UsersRepository;

@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;  // To encode and verify passwords

    // Create a new user (signup)
    public Users createUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    // Get user by ID
    public Users getUserById(Long userId) {
        return usersRepository.findById(userId).orElse(null);
    }

    // Get all users
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    // Update user details
    public Boolean updateUser(Long userId, Users user) {
        if (usersRepository.findById(userId).isEmpty()) {
            return false;
        }
        try {
            // Hash the password before saving if it has been changed
            if (user.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            usersRepository.save(user);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    // Delete user by ID
    public Boolean deleteUser(Long userId) {
        if (this.getUserById(userId) == null) {
            return false;
        }
        usersRepository.deleteById(userId);
        return true;
    }

    // Authenticate user by email and password
    public Users authenticate(String email, String password) {
        Optional<Users> userOptional = usersRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }
}

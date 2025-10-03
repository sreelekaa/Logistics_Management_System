package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Users;
import com.example.backend.service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    UsersService usersService;

    // Create a new user (signup)
    @PostMapping("/add")
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        Users obj = usersService.createUser(user);
        return new ResponseEntity<>(obj, HttpStatus.CREATED);
    }

    // Get user by ID
    @GetMapping("/getId/{userId}")
    public ResponseEntity<Users> getUserById(@PathVariable("userId") Long userId) {
        Users obj = usersService.getUserById(userId);
        if (obj != null) {
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get all users
    @GetMapping("/getAll")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> obj = usersService.getAllUsers();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    // Update user details
    @PutMapping("/update/{userId}")
    public ResponseEntity<Users> updateUser(@PathVariable("userId") Long userId, @RequestBody Users user) {
        if (usersService.updateUser(userId, user)) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete user by ID
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("userId") Long userId) {
        if (usersService.deleteUser(userId)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    // Authenticate user
    @PostMapping("/authenticate")
    public ResponseEntity<Users> authenticateUser(@RequestBody Users user) {
        Users authenticatedUser = usersService.authenticate(user.getEmail(), user.getPassword());
        if (authenticatedUser != null) {
            return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}

package com.example.backend.controller;

import com.example.backend.model.Contact;
import com.example.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
// @CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/add")
    public Contact submitMessage(@RequestBody Contact contact) {
        return contactService.saveMessage(contact);
    }

    @GetMapping("/getAll")
    public List<Contact> getAllMessages() {
        return contactService.getAllMessages();
    }

    @GetMapping("/get/{id}")
    public Contact getMessageById(@PathVariable Long id) {
        return contactService.getMessageById(id);
    }

    @PutMapping("/update/{id}")
    public Contact updateMessage(@PathVariable Long id, @RequestBody Contact contact) {
        return contactService.updateMessage(id, contact);
    }
    @DeleteMapping("/deleteAll")
    public void deleteAllMessages() {
        contactService.deleteAllMessages();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
    }
}
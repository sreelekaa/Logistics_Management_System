package com.example.backend.service;

import com.example.backend.model.Contact;
import com.example.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact saveMessage(Contact contact) {
        return contactRepository.save(contact);
    }

    public List<Contact> getAllMessages() {
        return contactRepository.findAll();
    }

    public Contact getMessageById(Long id) {
        return contactRepository.findById(id).orElse(null);
    }

    public Contact updateMessage(Long id, Contact contact) {
        Optional<Contact> existingMessageOpt = contactRepository.findById(id);
        if (existingMessageOpt.isPresent()) {
            Contact existingMessage = existingMessageOpt.get();
            existingMessage.setName(contact.getName());
            existingMessage.setEmail(contact.getEmail());
            existingMessage.setPhone(contact.getPhone());
            existingMessage.setAddress(contact.getAddress());
            existingMessage.setMessage(contact.getMessage());
            return contactRepository.save(existingMessage);
        } else {
            return null;
        }
    }

    public void deleteMessage(Long id) {
        contactRepository.deleteById(id);
    }

    public void deleteAllMessages() {
        contactRepository.deleteAll();
    }
}
package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.InventoryItem;
import com.example.backend.repository.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    public InventoryItem saveItem(InventoryItem item) {
        return inventoryRepository.save(item);
    }

    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }
}
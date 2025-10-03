package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.InventoryItem;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
}

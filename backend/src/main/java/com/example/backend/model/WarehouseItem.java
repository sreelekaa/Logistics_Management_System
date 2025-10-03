package com.example.backend.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class WarehouseItem {

    private String item;
    private Integer quantity;

    // Getters and Setters
    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

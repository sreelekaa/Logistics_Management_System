package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Shipment;
import com.example.backend.service.ShipmentService;

import java.util.List;

@RestController
@RequestMapping("/shipments")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the React frontend
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @PostMapping("/add")
    public ResponseEntity<Shipment> createShipment(@RequestBody Shipment shipment) {
        Shipment createdShipment = shipmentService.createShipment(shipment);
        return ResponseEntity.ok(createdShipment);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Shipment> updateShipmentStatus(@PathVariable Long id, @RequestBody String status) {
        Shipment updatedShipment = shipmentService.updateShipmentStatus(id, status);
        return ResponseEntity.ok(updatedShipment);
    }

    @GetMapping
    public ResponseEntity<List<Shipment>> getAllShipments() {
        List<Shipment> shipments = shipmentService.getAllShipments();
        return ResponseEntity.ok(shipments);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteShipment(@PathVariable Long id) {
        shipmentService.deleteShipment(id);
        return ResponseEntity.noContent().build();
    }
}

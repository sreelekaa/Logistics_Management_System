package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Shipment;
import com.example.backend.repository.ShipmentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    public Shipment createShipment(Shipment shipment) {
        shipment.setStatus("Paid");
        return shipmentRepository.save(shipment);
    }

    public Shipment updateShipmentStatus(Long id, String status) {
        Optional<Shipment> shipmentOptional = shipmentRepository.findById(id);
        if (shipmentOptional.isPresent()) {
            Shipment shipment = shipmentOptional.get();
            shipment.setStatus(status);
            return shipmentRepository.save(shipment);
        } else {
            throw new RuntimeException("Shipment not found");
        }
    }

    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }
}

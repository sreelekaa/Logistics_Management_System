package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "shipments")
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String selectedService;
    private String customerName;
    private String email;
    private String phoneNumber;
    private String address;
    private Date deliveryDate;
    private double shipmentWeight;
    private String packageDimensions;
    private String goodsType;
    private String warehouseDetails; // 'None', 'Needed', 'Goods Needed'
    private String warehouseLocation;
    private String warehouseSpace;
    private String warehouseGoods;
    private String warehouseGoodsQuantity;
    private String status;
}

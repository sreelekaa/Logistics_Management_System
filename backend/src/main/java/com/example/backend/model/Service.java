package com.example.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Service {
    @Id
    private Long id;

    private String title;
    private String type;
    private String description;
    private String price;
    private String route;
    private String image;
    private String link;
    
    private List<String> addOns;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<String> getAddOns() {
        return addOns;
    }

    public void setAddOns(List<String> addOns) {
        this.addOns = addOns;
    }

    public Service(Long id, String title, String type, String description, String price, String route, String image,
            String link, List<String> addOns) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.price = price;
        this.route = route;
        this.image = image;
        this.link = link;
        this.addOns = addOns;
    }

    public Service() {
    }

}

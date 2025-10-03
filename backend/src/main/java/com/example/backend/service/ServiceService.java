package com.example.backend.service;

import com.example.backend.model.Service;
import com.example.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service updatedService) {
        return serviceRepository.findById(id)
                .map(service -> {
                    service.setTitle(updatedService.getTitle());
                    service.setType(updatedService.getType());
                    service.setDescription(updatedService.getDescription());
                    service.setPrice(updatedService.getPrice());
                    service.setRoute(updatedService.getRoute());
                    service.setImage(updatedService.getImage());
                    service.setLink(updatedService.getLink());
                    service.setAddOns(updatedService.getAddOns());
                    return serviceRepository.save(service);
                })
                .orElseGet(() -> {
                    updatedService.setId(id);
                    return serviceRepository.save(updatedService);
                });
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}

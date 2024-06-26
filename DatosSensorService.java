package com.example.demo.service;

import com.example.demo.model.DatosSensor;
import com.example.demo.repository.DatosSensorRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DatosSensorService {

    private final DatosSensorRepository datosSensorRepository;

    public DatosSensorService(DatosSensorRepository datosSensorRepository) {
        this.datosSensorRepository = datosSensorRepository;
    }

    public List<DatosSensor> getAllDatosSensor() {
        return datosSensorRepository.findAll();
    }

    public Optional<DatosSensor> getDatosSensorById(Long id) {
        return datosSensorRepository.findById(id);
    }

    public DatosSensor createDatosSensor(DatosSensor datosSensor) {
        // Puedes agregar validaciones u lógica adicional antes de guardar
        return datosSensorRepository.save(datosSensor);
    }

    public Optional<DatosSensor> updateDatosSensor(Long id, DatosSensor datosSensor) {
        Optional<DatosSensor> existingDatosSensorOptional = datosSensorRepository.findById(id);
        if (existingDatosSensorOptional.isEmpty()) {
            return Optional.empty();
        }
        datosSensor.setId(id); // Aseguramos que el ID sea el correcto
        DatosSensor updatedDatosSensor = datosSensorRepository.save(datosSensor);
        return Optional.of(updatedDatosSensor);
    }

    public Optional<DatosSensor> findLastDataById(Long id) {
        return datosSensorRepository.findLastDataById(id);
    }

    public boolean deleteDatosSensor(Long id) {
        if (!datosSensorRepository.existsById(id)) {
            return false;
        }
        datosSensorRepository.deleteById(id);
        return true;
    }
}

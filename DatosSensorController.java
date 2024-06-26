package com.example.demo.controller;

import com.example.demo.model.DatosSensor;
import com.example.demo.service.DatosSensorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/datos_sensor")
@CrossOrigin("*")
public class DatosSensorController {
    @Autowired
    private final DatosSensorService datosSensorService;

    public DatosSensorController(DatosSensorService datosSensorService) {
        this.datosSensorService = datosSensorService;
    }

    // Endpoint para obtener todos los datos de sensores
    @GetMapping
    public ResponseEntity<List<DatosSensor>> getAllDatosSensor() {
        List<DatosSensor> datosSensorList = datosSensorService.getAllDatosSensor();
        return ResponseEntity.ok(datosSensorList);
    }

    // Endpoint para obtener un dato de sensor por ID
    @GetMapping("/{id}")
    public ResponseEntity<DatosSensor> getDatosSensorById(@PathVariable Long id) {
        Optional<DatosSensor> datosSensorOptional = datosSensorService.getDatosSensorById(id);
        return datosSensorOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para crear un nuevo dato de sensor
    @PostMapping
    public ResponseEntity<DatosSensor> createDatosSensor(@RequestBody DatosSensor datosSensor) {
        DatosSensor createdDatosSensor = datosSensorService.createDatosSensor(datosSensor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDatosSensor);
    }

    // Endpoint para actualizar un dato de sensor existente
    @PutMapping("/{id}")
    public ResponseEntity<DatosSensor> updateDatosSensor(@PathVariable Long id, @RequestBody DatosSensor datosSensor) {
        Optional<DatosSensor> updatedDatosSensor = datosSensorService.updateDatosSensor(id, datosSensor);
        return updatedDatosSensor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para eliminar un dato de sensor por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatosSensor(@PathVariable Long id) {
        boolean deleted = datosSensorService.deleteDatosSensor(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/last")
    public ResponseEntity<DatosSensor> getLastDataById(@PathVariable Long id) {
        Optional<DatosSensor> lastData = datosSensorService.findLastDataById(id);
        return lastData.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

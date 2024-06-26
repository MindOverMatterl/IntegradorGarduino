package com.example.demo.repository;

import com.example.demo.model.DatosSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatosSensorRepository extends JpaRepository<DatosSensor, Long> {

    @Query("SELECT d FROM DatosSensor d WHERE d.id = :id ORDER BY d.fechaRegistro DESC")
    Optional<DatosSensor> findLastDataById(@Param("id") Long id);
}

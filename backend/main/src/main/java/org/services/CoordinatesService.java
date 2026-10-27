package org.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.events.DataChangePublisher;
import org.repository.CoordinateRepository;
import org.services.DTO.CoordinatesDto;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CoordinatesService {
    @Inject private CoordinateRepository coordinateRepository;
    @Inject private DataChangePublisher dataChangePublisher;

    @Transactional
    public CoordinatesDto create(CoordinatesDto dto) {
        CoordinatesDto createdCoordinates = CoordinatesDto.fromModel(
                coordinateRepository.insert(dto.toModel())
        );
        dataChangePublisher.publish();
        return createdCoordinates;
    }

    public List<CoordinatesDto> findAll() {
        return coordinateRepository.findAll()
                .map(CoordinatesDto::fromModel)
                .toList();
    }

    public Optional<CoordinatesDto> findById(int id) {
        return coordinateRepository.findById(id)
                .map(CoordinatesDto::fromModel);
    }

    @Transactional
    public Optional<CoordinatesDto> update(int id, CoordinatesDto dto) {
        return coordinateRepository.findById(id)
                .map(existing -> {
                    dto.setId(id);
                    CoordinatesDto updatedCoordinates = CoordinatesDto.fromModel(
                            coordinateRepository.update(dto.toModel())
                    );
                    dataChangePublisher.publish();
                    return updatedCoordinates;
                });
    }

    @Transactional
    public boolean delete(int id) {
        if (coordinateRepository.findById(id).isEmpty()) {
            return false;
        }

        coordinateRepository.deleteById(id);
        dataChangePublisher.publish();
        return true;
    }
}

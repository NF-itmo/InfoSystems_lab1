package org.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.repository.CoordinateRepository;
import org.services.DTO.CoordinatesDto;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CoordinatesService {
    @Inject private CoordinateRepository coordinateRepository;

    @Transactional
    public CoordinatesDto create(CoordinatesDto dto) {
        return CoordinatesDto.fromModel(
                coordinateRepository.insert(dto.toModel())
        );
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
                    return CoordinatesDto.fromModel(
                            coordinateRepository.update(dto.toModel())
                    );
                });
    }

    @Transactional
    public boolean delete(int id) {
        if (coordinateRepository.findById(id).isEmpty()) {
            return false;
        }

        coordinateRepository.deleteById(id);
        return true;
    }
}

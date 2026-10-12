package org.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.repository.RingRepository;
import org.services.DTO.RingDto;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class RingService {
    @Inject private RingRepository ringRepository;

    @Transactional
    public RingDto create(RingDto dto) {
        return RingDto.fromModel(
                ringRepository.insert(dto.toModel())
        );
    }

    public List<RingDto> findAll() {
        return ringRepository.findAll()
                .map(RingDto::fromModel)
                .toList();
    }

    public Optional<RingDto> findByName(String name) {
        return ringRepository.findById(name)
                .map(RingDto::fromModel);
    }

    @Transactional
    public Optional<RingDto> update(String name, RingDto dto) {
        return ringRepository.findById(name)
                .map(existing -> {
                    dto.setName(name);
                    return RingDto.fromModel(
                            ringRepository.update(dto.toModel())
                    );
                });
    }

    @Transactional
    public boolean delete(String name) {
        if (ringRepository.findById(name).isEmpty()) {
            return false;
        }

        ringRepository.deleteById(name);
        return true;
    }
}

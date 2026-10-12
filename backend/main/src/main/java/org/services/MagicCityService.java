package org.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.repository.MagicCityRepository;
import org.services.DTO.MagicCityDto;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MagicCityService {
    @Inject private MagicCityRepository magicCityRepository;

    @Transactional
    public MagicCityDto create(MagicCityDto dto) {
        return MagicCityDto.fromModel(
                magicCityRepository.insert(dto.toModel())
        );
    }

    public List<MagicCityDto> findAll() {
        return magicCityRepository.findAll()
                .map(MagicCityDto::fromModel)
                .toList();
    }

    public Optional<MagicCityDto> findByName(String name) {
        return magicCityRepository.findById(name)
                .map(MagicCityDto::fromModel);
    }

    @Transactional
    public Optional<MagicCityDto> update(String name, MagicCityDto dto) {
        return magicCityRepository.findById(name)
                .map(existing -> {
                    dto.setName(name);
                    return MagicCityDto.fromModel(
                            magicCityRepository.update(dto.toModel())
                    );
                });
    }

    @Transactional
    public boolean delete(String name) {
        if (magicCityRepository.findById(name).isEmpty()) {
            return false;
        }

        magicCityRepository.deleteById(name);
        return true;
    }
}

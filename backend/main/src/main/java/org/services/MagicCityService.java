package org.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.events.DataChangePublisher;
import org.repository.MagicCityRepository;
import org.services.DTO.MagicCityDto;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MagicCityService {
    @Inject private MagicCityRepository magicCityRepository;
    @Inject private DataChangePublisher dataChangePublisher;

    @Transactional
    public MagicCityDto create(MagicCityDto dto) {
        MagicCityDto createdMagicCity = MagicCityDto.fromModel(
                magicCityRepository.insert(dto.toModel())
        );
        dataChangePublisher.publish();
        return createdMagicCity;
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
                    MagicCityDto updatedMagicCity = MagicCityDto.fromModel(
                            magicCityRepository.update(dto.toModel())
                    );
                    dataChangePublisher.publish();
                    return updatedMagicCity;
                });
    }

    @Transactional
    public boolean delete(String name) {
        if (magicCityRepository.findById(name).isEmpty()) {
            return false;
        }

        magicCityRepository.deleteById(name);
        dataChangePublisher.publish();
        return true;
    }
}

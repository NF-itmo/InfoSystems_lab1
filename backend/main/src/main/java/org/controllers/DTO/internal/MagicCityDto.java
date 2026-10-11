package org.controllers.DTO.internal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;
import java.util.function.Function;

public record MagicCityDto(
        @NotBlank String name,
        @NotNull @Positive Long area,
        @Positive int population,
        LocalDateTime establishmentDate,
        @NotNull BookCreatureType governor,
        @NotNull Boolean capital,
        @Positive int populationDensity
) {
    public static MagicCityDto fromServiceDto(org.services.DTO.MagicCityDto serviceDto) {
        return new MagicCityDto.FromServiceDTOMapper().apply(serviceDto);
    }

    public static org.services.DTO.MagicCityDto toServiceDto(MagicCityDto requestDto) {
        return new MagicCityDto.ToServiceDTOMapper().apply(requestDto);
    }

    public static final class FromServiceDTOMapper implements Function<org.services.DTO.MagicCityDto, MagicCityDto> {
        @Override
        public MagicCityDto apply(org.services.DTO.MagicCityDto serviceDto) {
            if (serviceDto == null) return null;

            return new MagicCityDto(
                    serviceDto.getName(),
                    serviceDto.getArea(),
                    serviceDto.getPopulation(),
                    serviceDto.getEstablishmentDate(),
                    BookCreatureType.valueOf(serviceDto.getGovernor().name()),
                    serviceDto.getCapital(),
                    serviceDto.getPopulationDensity()
            );
        }
    }

    public static final class ToServiceDTOMapper implements Function<MagicCityDto, org.services.DTO.MagicCityDto> {
        @Override
        public org.services.DTO.MagicCityDto apply(MagicCityDto requestDto) {
            if (requestDto == null) return null;

            return new org.services.DTO.MagicCityDto(
                    requestDto.name(),
                    requestDto.area(),
                    requestDto.population(),
                    requestDto.establishmentDate(),
                    org.services.DTO.BookCreatureType.valueOf(requestDto.governor().name()),
                    requestDto.capital(),
                    requestDto.populationDensity()
            );
        }
    }
}

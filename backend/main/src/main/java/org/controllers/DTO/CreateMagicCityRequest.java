package org.controllers.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.services.DTO.MagicCityDto;

import java.time.LocalDateTime;
import java.util.function.Function;

public record CreateMagicCityRequest(
        @NotBlank String name,
        @NotNull @Positive Long area,
        @Positive int population,
        LocalDateTime establishmentDate,
        @NotNull BookCreatureType governor,
        @NotNull Boolean capital,
        @Positive int populationDensity
) {
    public MagicCityDto toServiceDto() {
        return new Mapper().apply(this);
    }

    public static final class Mapper implements Function<CreateMagicCityRequest, MagicCityDto> {
        @Override
        public MagicCityDto apply(CreateMagicCityRequest request) {
            return new MagicCityDto(
                    request.name(),
                    request.area(),
                    request.population(),
                    request.establishmentDate(),
                    org.services.DTO.BookCreatureType.valueOf(request.governor().name()),
                    request.capital(),
                    request.populationDensity()
            );
        }
    }
}

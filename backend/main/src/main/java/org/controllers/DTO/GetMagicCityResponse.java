package org.controllers.DTO;

import org.services.DTO.MagicCityDto;

import java.time.LocalDateTime;
import java.util.function.Function;

public record GetMagicCityResponse(
        String name,
        Long area,
        int population,
        LocalDateTime establishmentDate,
        BookCreatureType governor,
        Boolean capital,
        int populationDensity
) {
    public static GetMagicCityResponse fromServiceDto(MagicCityDto serviceDto) {
        return new Mapper().apply(serviceDto);
    }

    public static final class Mapper implements Function<MagicCityDto, GetMagicCityResponse> {
        @Override
        public GetMagicCityResponse apply(MagicCityDto dto) {
            if (dto == null) {
                return null;
            }

            return new GetMagicCityResponse(
                    dto.getName(),
                    dto.getArea(),
                    dto.getPopulation(),
                    dto.getEstablishmentDate(),
                    BookCreatureType.valueOf(dto.getGovernor().name()),
                    dto.getCapital(),
                    dto.getPopulationDensity()
            );
        }
    }
}

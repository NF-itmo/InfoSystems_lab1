package org.controllers.DTO;

import org.controllers.DTO.internal.BookCreatureType;
import org.controllers.DTO.internal.CoordinatesDto;

import java.time.LocalDate;
import java.util.function.Function;

import org.controllers.DTO.internal.MagicCityDto;
import org.controllers.DTO.internal.RingDto;
import org.services.DTO.BookCreatureDto;

public record GetBookCreatureResponse(
        int id,
        String name,
        CoordinatesDto coordinates,
        LocalDate creationDate,
        int age,
        BookCreatureType creatureType,
        MagicCityDto creatureLocation,
        Float attackLevel,
        Double defenseLevel,
        RingDto ring
) {
    public static GetBookCreatureResponse fromServiceDto(BookCreatureDto serviceDto) {
        return new GetBookCreatureResponse.Mapper().apply(serviceDto);
    }

    public static final class Mapper implements Function<BookCreatureDto, GetBookCreatureResponse> {
        @Override public GetBookCreatureResponse apply(BookCreatureDto dto) {
            return new GetBookCreatureResponse(
                    dto.getId(),
                    dto.getName(),
                    CoordinatesDto.fromServiceDto(dto.getCoordinates()),
                    dto.getCreationDate(),
                    dto.getAge(),
                    BookCreatureType.valueOf(dto.getCreatureType().name()),
                    MagicCityDto.fromServiceDto(dto.getCreatureLocation()),
                    dto.getAttackLevel(),
                    dto.getDefenseLevel(),
                    RingDto.fromServiceDto(dto.getRing())
            );
        }
    }
}

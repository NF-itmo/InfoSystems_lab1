package org.controllers.DTO.bookCreature;

import java.time.LocalDate;
import java.util.function.Function;

import org.controllers.DTO.BookCreatureType;
import org.controllers.DTO.coordinates.GetCoordinatesResponse;
import org.controllers.DTO.magicCity.GetMagicCityResponse;
import org.controllers.DTO.ring.GetRingResponse;
import org.services.DTO.BookCreatureDto;

public record GetBookCreatureResponse(
        int id,
        String name,
        GetCoordinatesResponse coordinates,
        LocalDate creationDate,
        int age,
        BookCreatureType creatureType,
        GetMagicCityResponse creatureLocation,
        Float attackLevel,
        Double defenseLevel,
        GetRingResponse ring
) {
    public static GetBookCreatureResponse fromServiceDto(BookCreatureDto serviceDto) {
        return new GetBookCreatureResponse.Mapper().apply(serviceDto);
    }

    public static final class Mapper implements Function<BookCreatureDto, GetBookCreatureResponse> {
        @Override public GetBookCreatureResponse apply(BookCreatureDto dto) {
            return new GetBookCreatureResponse(
                    dto.getId(),
                    dto.getName(),
                    GetCoordinatesResponse.fromServiceDto(dto.getCoordinates()),
                    dto.getCreationDate(),
                    dto.getAge(),
                    BookCreatureType.valueOf(dto.getCreatureType().name()),
                    GetMagicCityResponse.fromServiceDto(dto.getCreatureLocation()),
                    dto.getAttackLevel(),
                    dto.getDefenseLevel(),
                    GetRingResponse.fromServiceDto(dto.getRing())
            );
        }
    }
}

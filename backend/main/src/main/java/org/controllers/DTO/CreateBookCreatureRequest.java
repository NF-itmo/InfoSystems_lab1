package org.controllers.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.controllers.DTO.internal.BookCreatureType;
import org.controllers.DTO.internal.CoordinatesDto;
import org.controllers.DTO.internal.MagicCityDto;
import org.controllers.DTO.internal.RingDto;
import org.services.DTO.BookCreatureDto;
import java.util.function.Function;

public record CreateBookCreatureRequest(
        @NotBlank String name,
        @NotNull @Valid CoordinatesDto coordinates,
        @Positive int age,
        @NotNull BookCreatureType creatureType,
        @Valid MagicCityDto creatureLocation,
        @NotNull @Positive Float attackLevel,
        @NotNull @Positive Double defenseLevel,
        @Valid RingDto ring
) {
    public BookCreatureDto toServiceDto() {
        return new Mapper().apply(this);
    }

    public static final class Mapper implements Function<CreateBookCreatureRequest, BookCreatureDto> {
        @Override public BookCreatureDto apply(CreateBookCreatureRequest request) {
            return BookCreatureDto.builder()
                    .name(request.name())
                    .coordinates(CoordinatesDto.toServiceDto(request.coordinates()))
                    .age(request.age())
                    .creatureType(org.services.DTO.BookCreatureType.valueOf(request.creatureType().name()))
                    .creatureLocation(MagicCityDto.toServiceDto(request.creatureLocation()))
                    .attackLevel(request.attackLevel())
                    .defenseLevel(request.defenseLevel())
                    .ring(RingDto.toServiceDto(request.ring()))
                    .build();
        }
    }
}

package org.controllers.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.controllers.DTO.internal.BookCreatureType;
import org.services.DTO.BookCreatureDto;
import org.services.DTO.CoordinatesDto;

import java.util.function.Function;

public record CreateBookCreatureRequest(
        @NotBlank String name,
        @NotNull @Positive Integer coordinatesId,
        @Positive int age,
        @NotNull BookCreatureType creatureType,
        String creatureLocationName,
        @NotNull @Positive Float attackLevel,
        @NotNull @Positive Double defenseLevel,
        String ringName
) {
    public BookCreatureDto toServiceDto() {
        return new Mapper().apply(this);
    }

    public static final class Mapper implements Function<CreateBookCreatureRequest, BookCreatureDto> {
        @Override public BookCreatureDto apply(CreateBookCreatureRequest request) {
            return BookCreatureDto.builder()
                    .name(request.name())
                    .coordinates(new CoordinatesDto().request.coordinatesId())
                    .age(request.age())
                    .creatureType(org.services.DTO.BookCreatureType.valueOf(request.creatureType().name()))
                    .creatureLocationName(request.creatureLocationName())
                    .attackLevel(request.attackLevel())
                    .defenseLevel(request.defenseLevel())
                    .ringName(request.ringName())
                    .build();
        }
    }
}

package org.controllers.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.services.DTO.BookCreatureDto;
import org.services.DTO.CoordinatesDto;
import org.services.DTO.MagicCityDto;
import org.services.DTO.RingDto;

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
        @Override
        public BookCreatureDto apply(CreateBookCreatureRequest request) {
            return BookCreatureDto.builder()
                    .name(request.name())
                    .coordinates(
                            CoordinatesDto.builder()
                                    .id(request.coordinatesId())
                                    .build()
                    )
                    .age(request.age())
                    .creatureType(org.services.DTO.BookCreatureType.valueOf(request.creatureType().name()))
                    .creatureLocation(
                            request.creatureLocationName() == null
                                    ? null
                                    : MagicCityDto.builder()
                                            .name(request.creatureLocationName())
                                            .build()
                    )
                    .attackLevel(request.attackLevel())
                    .defenseLevel(request.defenseLevel())
                    .ring(
                            request.ringName() == null
                                    ? null
                                    : RingDto.builder()
                                            .name(request.ringName())
                                            .build()
                    )
                    .build();
        }
    }
}

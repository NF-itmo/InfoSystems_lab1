package org.controllers.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.services.DTO.BookCreatureDto;
import java.util.function.Function;

public record UpdateBookCreatureRequest(
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

    public static final class Mapper implements Function<UpdateBookCreatureRequest, BookCreatureDto> {
        @Override public BookCreatureDto apply(UpdateBookCreatureRequest requestDto) {
            return new CreateBookCreatureRequest.Mapper().apply(
                    new CreateBookCreatureRequest(
                            requestDto.name(),
                            requestDto.coordinatesId(),
                            requestDto.age(),
                            requestDto.creatureType(),
                            requestDto.creatureLocationName(),
                            requestDto.attackLevel(),
                            requestDto.defenseLevel(),
                            requestDto.ringName()
                    )
            );
        }
    }
}

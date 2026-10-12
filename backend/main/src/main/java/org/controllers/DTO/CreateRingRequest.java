package org.controllers.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.services.DTO.RingDto;

import java.util.function.Function;

public record CreateRingRequest(
        @NotBlank String name,
        @Positive int power,
        @NotNull @Positive Long weight
) {
    public RingDto toServiceDto() {
        return new Mapper().apply(this);
    }

    public static final class Mapper implements Function<CreateRingRequest, RingDto> {
        @Override
        public RingDto apply(CreateRingRequest request) {
            return new RingDto(
                    request.name(),
                    request.power(),
                    request.weight()
            );
        }
    }
}

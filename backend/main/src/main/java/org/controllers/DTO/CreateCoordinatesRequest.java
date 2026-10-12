package org.controllers.DTO;

import jakarta.validation.constraints.DecimalMin;
import org.services.DTO.CoordinatesDto;

import java.util.function.Function;

public record CreateCoordinatesRequest(
        @DecimalMin(value = "-126", inclusive = false) double x,
        int y
) {
    public CoordinatesDto toServiceDto() {
        return new Mapper().apply(this);
    }

    public static final class Mapper implements Function<CreateCoordinatesRequest, CoordinatesDto> {
        @Override
        public CoordinatesDto apply(CreateCoordinatesRequest request) {
            return new CoordinatesDto(null, request.x(), request.y());
        }
    }
}

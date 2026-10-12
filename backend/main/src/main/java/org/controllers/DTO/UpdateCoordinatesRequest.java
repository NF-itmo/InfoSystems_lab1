package org.controllers.DTO;

import jakarta.validation.constraints.DecimalMin;
import org.services.DTO.CoordinatesDto;

import java.util.function.Function;

public record UpdateCoordinatesRequest(
        @DecimalMin(value = "-126", inclusive = false) double x,
        int y
) {
    public CoordinatesDto toServiceDto() {
        return new Mapper().apply(this);
    }

    public static final class Mapper implements Function<UpdateCoordinatesRequest, CoordinatesDto> {
        @Override
        public CoordinatesDto apply(UpdateCoordinatesRequest request) {
            return new CoordinatesDto(null, request.x(), request.y());
        }
    }
}

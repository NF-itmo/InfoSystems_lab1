package org.controllers.DTO.coordinates;

import org.services.DTO.CoordinatesDto;

import java.util.function.Function;

public record CreateCoordinatesResponse(
        int id,
        double x,
        int y
) {
    public static CreateCoordinatesResponse fromServiceDto(CoordinatesDto serviceDto) {
        return new Mapper().apply(serviceDto);
    }

    public static final class Mapper implements Function<CoordinatesDto, CreateCoordinatesResponse> {
        @Override
        public CreateCoordinatesResponse apply(CoordinatesDto dto) {
            return new CreateCoordinatesResponse(dto.getId(), dto.getX(), dto.getY());
        }
    }
}

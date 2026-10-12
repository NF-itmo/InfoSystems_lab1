package org.controllers.DTO.coordinates;

import org.services.DTO.CoordinatesDto;

import java.util.function.Function;

public record GetCoordinatesResponse(
        int id,
        double x,
        int y
) {
    public static GetCoordinatesResponse fromServiceDto(CoordinatesDto serviceDto) {
        return new Mapper().apply(serviceDto);
    }

    public static final class Mapper implements Function<CoordinatesDto, GetCoordinatesResponse> {
        @Override
        public GetCoordinatesResponse apply(CoordinatesDto dto) {
            if (dto == null) {
                return null;
            }

            return new GetCoordinatesResponse(dto.getId(), dto.getX(), dto.getY());
        }
    }
}

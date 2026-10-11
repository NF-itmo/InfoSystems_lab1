package org.controllers.DTO.internal;

import jakarta.validation.constraints.DecimalMin;

import java.util.function.Function;

public record CoordinatesDto(
        @DecimalMin(value = "-126", inclusive = false) double x,
        int y
) {
    public static CoordinatesDto fromServiceDto(org.services.DTO.CoordinatesDto serviceDto) {
        return new CoordinatesDto.FromServiceDTOMapper().apply(serviceDto);
    }

    public static org.services.DTO.CoordinatesDto toServiceDto(CoordinatesDto requestDto) {
        return new CoordinatesDto.ToServiceDTOMapper().apply(requestDto);
    }

    public static final class FromServiceDTOMapper implements Function<org.services.DTO.CoordinatesDto, CoordinatesDto> {
        @Override
        public CoordinatesDto apply(org.services.DTO.CoordinatesDto serviceDto) {
            if (serviceDto == null) return null;

            return new CoordinatesDto(
                    serviceDto.getX(),
                    serviceDto.getY()
            );
        }
    }

    public static final class ToServiceDTOMapper implements Function<CoordinatesDto, org.services.DTO.CoordinatesDto> {
        @Override
        public org.services.DTO.CoordinatesDto apply(CoordinatesDto requestDto) {
            if (requestDto == null) return null;

            return new org.services.DTO.CoordinatesDto(
                    requestDto.x(),
                    requestDto.y()
            );
        }
    }
}

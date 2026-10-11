package org.controllers.DTO.internal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.function.Function;

public record RingDto(
        @NotBlank String name,
        @Positive int power,
        @NotNull @Positive Long weight
) {
    public static RingDto fromServiceDto(org.services.DTO.RingDto serviceDto) {
        return new RingDto.FromServiceDTOMapper().apply(serviceDto);
    }

    public static org.services.DTO.RingDto toServiceDto(RingDto requestDto) {
        return new RingDto.ToServiceDTOMapper().apply(requestDto);
    }

    public static final class FromServiceDTOMapper implements Function<org.services.DTO.RingDto, RingDto> {
        @Override
        public RingDto apply(org.services.DTO.RingDto serviceDto) {
            if (serviceDto == null) return null;

            return new RingDto(
                    serviceDto.getName(),
                    serviceDto.getPower(),
                    serviceDto.getWeight()
            );
        }
    }

    public static final class ToServiceDTOMapper implements Function<RingDto, org.services.DTO.RingDto> {
        @Override
        public org.services.DTO.RingDto apply(RingDto requestDto) {
            if (requestDto == null) return null;

            return new org.services.DTO.RingDto(
                    requestDto.name(),
                    requestDto.power(),
                    requestDto.weight()
            );
        }
    }
}

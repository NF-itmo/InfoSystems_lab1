package org.controllers.DTO;

import org.services.DTO.RingDto;

import java.util.function.Function;

public record GetRingResponse(
        String name,
        int power,
        Long weight
) {
    public static GetRingResponse fromServiceDto(RingDto serviceDto) {
        return new Mapper().apply(serviceDto);
    }

    public static final class Mapper implements Function<RingDto, GetRingResponse> {
        @Override
        public GetRingResponse apply(RingDto dto) {
            return new GetRingResponse(
                    dto.getName(),
                    dto.getPower(),
                    dto.getWeight()
            );
        }
    }
}

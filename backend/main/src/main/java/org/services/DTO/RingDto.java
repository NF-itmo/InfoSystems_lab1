package org.services.DTO;

import lombok.*;
import org.models.Ring;
import java.util.function.Function;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RingDto {
    private String name;
    private int power;
    private Long weight;

    public static RingDto fromModel(Ring value) {
        return new FromModelMapper().apply(value);
    }

    public Ring toModel() {
        return new ToModelMapper().apply(this);
    }

    public static final class FromModelMapper implements Function<Ring, RingDto> {
        @Override
        public RingDto apply(Ring value) {
            if (value == null) return null;

            return new RingDto(
                    value.getName(),
                    value.getPower(),
                    value.getWeight()
            );
        }
    }

    public static final class ToModelMapper implements Function<RingDto, Ring> {
        @Override
        public Ring apply(RingDto value) {
            if (value == null) return null;

            return Ring.builder()
                    .name(value.getName())
                    .power(value.getPower())
                    .weight(value.getWeight())
                    .build();
        }
    }
}

package org.services.DTO;

import lombok.*;
import org.models.Coordinate;
import java.util.function.Function;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CoordinatesDto {
    private double x;
    private int y;

    public static CoordinatesDto fromModel(Coordinate value) {
        return new FromModelMapper().apply(value);
    }
    public Coordinate toModel() {
        return new ToModelMapper().apply(this);
    }

    public static final class FromModelMapper implements Function<Coordinate, CoordinatesDto> {
        @Override public CoordinatesDto apply(Coordinate value) {
            if (value == null) return null;

            return new CoordinatesDto(
                    value.getX(),
                    value.getY()
            );
        }
    }
    public static final class ToModelMapper implements Function<CoordinatesDto, Coordinate> {
        @Override public Coordinate apply(CoordinatesDto value) {
            if (value == null) return null;

            return Coordinate.builder()
                    .x(value.getX())
                    .y(value.getY())
                    .build();
        }
    }
}

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
    private Integer id;
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
                    value.getId(),
                    value.getX(),
                    value.getY()
            );
        }
    }
    public static final class ToModelMapper implements Function<CoordinatesDto, Coordinate> {
        @Override public Coordinate apply(CoordinatesDto value) {
            if (value == null) return null;

            return Coordinate.builder()
                    .id(value.getId())
                    .x(value.getX())
                    .y(value.getY())
                    .build();
        }
    }
}

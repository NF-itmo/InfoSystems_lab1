package org.services.DTO;

import lombok.*;
import java.time.LocalDate;
import org.models.BookCreature;
import java.util.function.Function;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookCreatureDto {
    private Integer id;
    private String name;
    private CoordinatesDto coordinates;
    private LocalDate creationDate;
    private int age;
    private BookCreatureType creatureType;
    private MagicCityDto creatureLocation;
    private Float attackLevel;
    private Double defenseLevel;
    private RingDto ring;

    public static BookCreatureDto fromModel(BookCreature value) {
        return new FromModelMapper().apply(value);
    }

    public BookCreature toModel() {
        return new ToModelMapper().apply(this);
    }

    public static final class FromModelMapper implements Function<BookCreature, BookCreatureDto> {
        @Override
        public BookCreatureDto apply(BookCreature value) {
            if (value == null) return null;

            return new BookCreatureDto(
                    value.getId(),
                    value.getName(),
                    CoordinatesDto.fromModel(value.getCoordinates()),
                    value.getCreationDate(),
                    value.getAge(),
                    BookCreatureType.valueOf(value.getCreatureType().name()),
                    MagicCityDto.fromModel(value.getCreatureLocationName()),
                    value.getAttackLevel(),
                    value.getDefenseLevel(),
                    RingDto.fromModel(value.getRingName())
            );
        }
    }

    public static final class ToModelMapper implements Function<BookCreatureDto, BookCreature> {
        @Override
        public BookCreature apply(BookCreatureDto value) {
            if (value == null) return null;

            return new BookCreature(
                    value.getId(),
                    value.getName(),
                    value.getCoordinates().toModel(),
                    value.getCreationDate(),
                    value.getAge(),
                    org.models.BookCreatureType.valueOf(value.getCreatureType().name()),
                    value.getCreatureLocation() == null
                            ? null
                            : value.getCreatureLocation().toModel(),
                    value.getAttackLevel(),
                    value.getDefenseLevel(),
                    value.getRing() == null
                            ? null
                            : value.getRing().toModel()
            );
        }
    }
}

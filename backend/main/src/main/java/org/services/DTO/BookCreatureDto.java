package org.services.DTO;

import lombok.*;
import java.time.LocalDate;

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
}

package org.services.DTO;

import lombok.*;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MagicCityDto {
    private String name;
    private Long area;
    private int population;
    private LocalDateTime establishmentDate;
    private BookCreatureType governor;
    private Boolean capital;
    private int populationDensity;
}

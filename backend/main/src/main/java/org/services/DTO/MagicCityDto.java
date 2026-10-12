package org.services.DTO;

import lombok.*;
import java.time.LocalDateTime;
import org.models.MagicCity;
import java.util.function.Function;

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

    public static MagicCityDto fromModel(MagicCity value) {
        return new FromModelMapper().apply(value);
    }

    public MagicCity toModel() {
        return new ToModelMapper().apply(this);
    }

    public static final class FromModelMapper implements Function<MagicCity, MagicCityDto> {
        @Override
        public MagicCityDto apply(MagicCity value) {
            if (value == null) return null;

            return new MagicCityDto(
                    value.getName(),
                    value.getArea(),
                    value.getPopulation(),
                    value.getEstablishmentDate(),
                    BookCreatureType.valueOf(value.getGovernor().name()),
                    value.getCapital(),
                    value.getPopulationDensity()
            );
        }
    }

    public static final class ToModelMapper implements Function<MagicCityDto, MagicCity> {
        @Override
        public MagicCity apply(MagicCityDto value) {
            if (value == null) return null;

            return MagicCity.builder()
                    .name(value.getName())
                    .area(value.getArea())
                    .population(value.getPopulation())
                    .establishmentDate(value.getEstablishmentDate())
                    .governor(org.models.BookCreatureType.valueOf(value.getGovernor().name()))
                    .capital(value.getCapital())
                    .populationDensity(value.getPopulationDensity())
                    .build();
        }
    }
}

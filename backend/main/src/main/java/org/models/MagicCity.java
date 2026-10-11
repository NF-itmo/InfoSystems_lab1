package org.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "magiccity")
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class MagicCity {
    @Id
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "area", nullable = false)
    private Long area;

    @NotNull
    @Column(name = "population", nullable = false)
    private Integer population;

    @Column(name = "establishment_date")
    private Instant establishmentDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "governor", nullable = false, columnDefinition = "BookCreatureType not null")
    private BookCreatureType creatureType;

    @NotNull
    @Column(name = "capital", nullable = false)
    private Boolean capital = false;

    @NotNull
    @Column(name = "population_density", nullable = false)
    private Integer populationDensity;

    @OneToMany(mappedBy = "creatureLocationName")
    private Set<BookCreature> bookCreatures = new LinkedHashSet<>();
}

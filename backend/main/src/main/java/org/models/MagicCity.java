package org.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.type.PostgreSQLEnumJdbcType;

import java.time.LocalDateTime;
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
    private LocalDateTime establishmentDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "governor", nullable = false, columnDefinition = "BookCreatureType not null")
    private BookCreatureType governor;

    @NotNull
    @Column(name = "capital", nullable = false)
    private Boolean capital = false;

    @NotNull
    @Column(name = "population_density", nullable = false)
    private Integer populationDensity;

    @OneToMany(mappedBy = "creatureLocationName")
    private Set<BookCreature> bookCreatures = new LinkedHashSet<>();
}

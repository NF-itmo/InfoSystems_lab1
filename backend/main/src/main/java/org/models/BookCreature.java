package org.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.type.PostgreSQLEnumJdbcType;

import java.time.LocalDate;

@Entity
@Table(name = "BookCreature")
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class BookCreature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "coordinates_id", nullable = false)
    private Coordinate coordinates;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "creature_type", nullable = false, columnDefinition = "BookCreatureType")
    private BookCreatureType creatureType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creature_location_name")
    private MagicCity creatureLocationName;

    @NotNull
    @Column(name = "attack_level", nullable = false)
    private Float attackLevel;

    @NotNull
    @Column(name = "defense_level", nullable = false)
    private Double defenseLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ring_name")
    private Ring ringName;
}

package org.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "Coordinates", schema = "s467233")
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Coordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "x", nullable = false)
    private Double x;

    @NotNull
    @Column(name = "y", nullable = false)
    private Integer y;

    @OneToMany(mappedBy = "coordinates")
    private Set<BookCreature> bookCreatures = new LinkedHashSet<>();
}
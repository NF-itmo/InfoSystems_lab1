package org.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "Ring", schema = "s467233")
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Ring {
    @Id
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "power", nullable = false)
    private Integer power;

    @NotNull
    @Column(name = "weight", nullable = false)
    private Long weight;

    @OneToMany(mappedBy = "ringName")
    private Set<BookCreature> bookCreatures = new LinkedHashSet<>();
}

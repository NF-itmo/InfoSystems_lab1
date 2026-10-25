package org.repository;

import jakarta.data.Limit;
import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Query;
import jakarta.data.repository.Repository;
import org.models.BookCreature;
import org.models.BookCreatureType;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookCreatureRepository extends CrudRepository<BookCreature, Integer> {
    @Query("""
            SELECT creature FROM BookCreature creature
            JOIN FETCH creature.coordinates
            LEFT JOIN FETCH creature.creatureLocationName
            LEFT JOIN FETCH creature.ringName
            WHERE creature.id = ?1
            """)
    Optional<BookCreature> findDetailedById(int id);

    @Query("""
            SELECT creature FROM BookCreature creature
            JOIN FETCH creature.coordinates
            LEFT JOIN FETCH creature.creatureLocationName
            LEFT JOIN FETCH creature.ringName
            WHERE LOWER(creature.name) LIKE CONCAT('%', LOWER(?1), '%')
            ORDER BY creature.id
            """)
    List<BookCreature> findByNamePattern(String pattern, Limit limit);

    @Query("""
            SELECT COUNT(creature) FROM BookCreature creature
            WHERE LOWER(creature.name) LIKE CONCAT('%', LOWER(?1), '%')
            """)
    long countByNamePattern(String pattern);

    @Query("SELECT AVG(creature.defenseLevel) FROM BookCreature creature")
    Double findAverageDefenseLevel();

    @Query("""
            SELECT creature FROM BookCreature creature
            JOIN FETCH creature.coordinates
            LEFT JOIN FETCH creature.creatureLocationName
            LEFT JOIN FETCH creature.ringName
            ORDER BY (
                creature.coordinates.x * creature.coordinates.x
                + creature.coordinates.y * creature.coordinates.y
            ) DESC, creature.id
            """)
    List<BookCreature> findByMaximumCoordinates(Limit limit);

    @Query("""
            SELECT COUNT(creature) FROM BookCreature creature
            WHERE creature.ringName.power >= ?1
            """)
    long countByRingPowerGreaterThan(int power);

    @Query("""
            UPDATE BookCreature creature
            SET creature.ringName = NULL
            WHERE creature.creatureType = ?1
            """)
    long removeRingsByCreatureType(BookCreatureType creatureType);

    @Query("""
            SELECT creature FROM BookCreature creature
            JOIN FETCH creature.coordinates
            JOIN FETCH creature.ringName
            LEFT JOIN FETCH creature.creatureLocationName
            ORDER BY creature.ringName.power DESC, creature.id
            """)
    List<BookCreature> findByMaximumRingPower(Limit limit);
}

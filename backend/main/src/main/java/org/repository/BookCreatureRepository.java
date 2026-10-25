package org.repository;

import jakarta.data.Limit;
import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Query;
import jakarta.data.repository.Repository;
import org.models.BookCreature;

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
}

package org.repository;

import jakarta.data.Limit;
import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Query;
import jakarta.data.repository.Repository;
import org.models.BookCreature;

import java.util.List;

@Repository
public interface BookCreatureRepository extends CrudRepository<BookCreature, Integer> {
    @Query("""
            SELECT creature FROM BookCreature creature
            WHERE LOWER(creature.name) LIKE CONCAT('%', LOWER(?1), '%')
            ORDER BY creature.id
            """)
    List<BookCreature> findByNamePattern(String pattern, Limit limit);

    @Query("""
            SELECT COUNT(creature) FROM BookCreature creature
            WHERE LOWER(creature.name) LIKE CONCAT('%', LOWER(?1), '%')
            """)
    long countByNamePattern(String pattern);
}

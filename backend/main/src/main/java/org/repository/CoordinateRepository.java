package org.repository;

import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;
import org.models.Coordinate;

@Repository
public interface CoordinateRepository extends CrudRepository<Coordinate, Integer> {
}

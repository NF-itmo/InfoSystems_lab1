package org.repository;

import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;
import org.models.Ring;

@Repository
public interface RingRepository extends CrudRepository<Ring, String> {
}

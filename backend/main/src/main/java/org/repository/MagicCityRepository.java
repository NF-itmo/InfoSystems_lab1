package org.repository;

import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;
import org.models.MagicCity;

@Repository
public interface MagicCityRepository extends CrudRepository<MagicCity, String> {
}

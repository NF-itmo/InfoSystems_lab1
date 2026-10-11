package org.services;

import org.services.DTO.BookCreatureDto;
import org.services.DTO.PageDto;

import java.util.Optional;

public abstract class BookCreatureService {
    public abstract BookCreatureDto create(BookCreatureDto bookCreature);
    public abstract Optional<BookCreatureDto> findById(int id);
    public abstract PageDto<BookCreatureDto> findAll(int page, int size, String nameFilter, String sort);
    public abstract Optional<BookCreatureDto> update(int id, BookCreatureDto bookCreature);
    public abstract boolean delete(int id);
}

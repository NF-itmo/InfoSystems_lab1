package org.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.data.Limit;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.events.DataChangePublisher;
import org.repository.BookCreatureRepository;
import org.models.BookCreatureType;
import org.services.DTO.BookCreatureDto;
import org.services.DTO.PageDto;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class BookCreatureService {
    @Inject private BookCreatureRepository bookRepository;
    @Inject private DataChangePublisher dataChangePublisher;

    @Transactional
    public BookCreatureDto create(BookCreatureDto dto) {
        BookCreatureDto createdBookCreature = BookCreatureDto.fromModel(
                bookRepository.insert(dto.toModel())
        );
        dataChangePublisher.publish();
        return createdBookCreature;
    }

    @Transactional
    public Optional<BookCreatureDto> findById(int id) {
        return bookRepository.findDetailedById(id)
                .map(BookCreatureDto::fromModel);
    }

    @Transactional
    public PageDto<BookCreatureDto> findAll(int page, int size, String nameFilter) {
        String pattern = nameFilter == null ? "" : nameFilter;
        long first = (long) page * size + 1;
        Limit limit = Limit.range(first, first + size - 1L);

        List<BookCreatureDto> items = bookRepository.findByNamePattern(pattern, limit).stream()
                .map(BookCreatureDto::fromModel)
                .toList();

        return new PageDto<>(items, page, size, bookRepository.countByNamePattern(pattern));
    }

    @Transactional
    public Double findAverageDefenseLevel() {
        return bookRepository.findAverageDefenseLevel();
    }

    @Transactional
    public Optional<BookCreatureDto> findByMaximumCoordinates() {
        return bookRepository.findByMaximumCoordinates(Limit.range(1, 1)).stream()
                .findFirst()
                .map(BookCreatureDto::fromModel);
    }

    @Transactional
    public long countByRingPowerGreaterThan(int power) {
        return bookRepository.countByRingPowerGreaterThan(power);
    }

    @Transactional
    public long removeRingsFromHobbits() {
        long affectedCount = bookRepository.removeRingsByCreatureType(BookCreatureType.HOBBIT);

        if (affectedCount > 0) {
            dataChangePublisher.publish();
        }

        return affectedCount;
    }

    @Transactional
    public Optional<BookCreatureDto> findByMaximumRingPower() {
        return bookRepository.findByMaximumRingPower(Limit.range(1, 1)).stream()
                .findFirst()
                .map(BookCreatureDto::fromModel);
    }

    @Transactional
    public Optional<BookCreatureDto> update(int id, BookCreatureDto dto) {
        return bookRepository.findById(id)
                .map(existing -> {
                    var bookCreature = dto.toModel();

                    bookCreature.setId(existing.getId());
                    bookCreature.setCreationDate(existing.getCreationDate());

                    BookCreatureDto updatedBookCreature = BookCreatureDto.fromModel(
                            bookRepository.update(bookCreature)
                    );
                    dataChangePublisher.publish();
                    return updatedBookCreature;
                });
    }

    @Transactional
    public boolean delete(int id) {
        if (bookRepository.findById(id).isEmpty()) return false;
        
        bookRepository.deleteById(id);
        dataChangePublisher.publish();
        return true;
    }
}

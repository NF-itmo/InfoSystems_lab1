import { useCallback, useEffect, useState } from "react";
import {
  getBookCreature,
  loadBookCreatures,
  useBookCreatures,
  type BookCreature,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import {
  DataTable,
  type DataTableColumn,
} from "@/06-shared/ui/data-table";
import { Pagination } from "@/06-shared/ui/pagination";
import { BookCreaturePopup } from "@/04-features/book-creature-popup";
import { CalculateAverageDefenseLevel } from "@/04-features/calculate-average-defense-level";
import { CountBookCreaturesWithMorePowerfulRing } from "@/04-features/count-book-creatures-with-more-powerful-ring";
import { CreateBookCreature } from "@/04-features/create-book-creature";
import { FindBookCreatureWithMaximumCoordinates } from "@/04-features/find-book-creature-with-maximum-coordinates";
import { FindBookCreatureWithStrongestRing } from "@/04-features/find-book-creature-with-strongest-ring";
import { SearchBookCreatures } from "@/04-features/search-book-creatures";
import { TakeRingsFromHobbits } from "@/04-features/take-rings-from-hobbits";
import styles from "./index.module.css";

const PAGE_SIZE = 5;

const columns: DataTableColumn<BookCreature>[] = [
  { key: "id", title: "ID", render: (book) => book.id },
  { key: "name", title: "Название", render: (book) => book.name },
  {
    key: "coordinates",
    title: "Координаты",
    render: (book) => `${book.coordinates.x}, ${book.coordinates.y}`,
  },
  { key: "age", title: "Возраст", render: (book) => book.age },
  { key: "type", title: "Тип", render: (book) => book.creatureType },
  {
    key: "city",
    title: "Город",
    render: (book) => book.creatureLocation?.name ?? "-",
  },
  { key: "attack", title: "Атака", render: (book) => book.attackLevel },
  { key: "defense", title: "Защита", render: (book) => book.defenseLevel },
  {
    key: "ring",
    title: "Кольцо",
    render: (book) => book.ring?.name ?? "-",
  },
  {
    key: "creationDate",
    title: "Дата создания",
    render: (book) => book.creationDate,
  },
];

export const BookCreaturesFeed = () => {
  const books = useBookCreatures();
  const [selectedBook, setSelectedBook] = useState<BookCreature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const showError = useErrorNotify();

  const reloadBooks = useCallback(async () => {
    setIsLoading(true);

    try {
      await loadBookCreatures({
        page,
        size: PAGE_SIZE,
        name: searchValue || undefined,
      });
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchValue, showError]);

  useEffect(() => {
    void reloadBooks();
  }, [reloadBooks]);

  const search = useCallback((name: string) => {
    setPage(0);
    setSearchValue(name);
  }, []);

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(0, currentPage - 1));
  };

  const goToNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const showBookDetails = async (bookId: number) => {
    try {
      setSelectedBook(await getBookCreature(bookId));
    } catch (error) {
      showError(error);
    }
  };

  return (
    <section className={styles.feed}>
      <div className={styles.header}>
        <h1 className={styles.title}>Существа книги</h1>
        <div className={styles.actions}>
          <CalculateAverageDefenseLevel/>
          <FindBookCreatureWithMaximumCoordinates onFound={setSelectedBook}/>
          <CountBookCreaturesWithMorePowerfulRing/>
          <TakeRingsFromHobbits onCompleted={reloadBooks}/>
          <FindBookCreatureWithStrongestRing onFound={setSelectedBook}/>
          <CreateBookCreature onCreated={reloadBooks}/>
        </div>
      </div>

      <SearchBookCreatures onSearch={search}/>

      <div className={styles.content}>
        {isLoading && (
          <p className={styles.message}>Загрузка списка существ...</p>
        )}
        {!isLoading && books.length === 0 && (
          <p className={styles.message}>Существа не найдены</p>
        )}
        {!isLoading && books.length > 0 && (
          <DataTable
            items={books}
            columns={columns}
            getRowKey={(book) => book.id}
            onRowClick={(book) => showBookDetails(book.id)}
          />
        )}
      </div>

      {!isLoading && (
        <Pagination
          page={page}
          hasNextPage={books.length === PAGE_SIZE}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}

      <BookCreaturePopup
        bookCreature={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
};

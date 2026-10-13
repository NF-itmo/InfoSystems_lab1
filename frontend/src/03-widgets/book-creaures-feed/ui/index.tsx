import { useCallback, useEffect, useState } from "react";
import {
  getBookCreature,
  loadBookCreatures,
  useBookCreatures,
  type BookCreature,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { Pagination } from "@/06-shared/ui/pagination";
import { BookCreaturePopup } from "@/04-features/book-creature-popup";
import { CreateBookCreature } from "@/04-features/create-book-creature";
import { SearchBookCreatures } from "@/04-features/search-book-creatures";
import { ShowBookCreatureItem } from "@/04-features/show-book-creature-item";
import styles from "./index.module.css";

const PAGE_SIZE = 5;

export const BookCreaturesFeed = () => {
  const books = useBookCreatures();
  const [selectedBook, setSelectedBook] = useState<BookCreature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const showError = useErrorNotify();

  useEffect(() => {
    setIsLoading(true);

    loadBookCreatures({
      page,
      size: PAGE_SIZE,
      name: searchValue || undefined,
    })
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, [page, searchValue, showError]);

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
        <CreateBookCreature/>
      </div>

      <SearchBookCreatures onSearch={search}/>

      <div className={styles.content}>
        {isLoading && (
          <p className={styles.message}>Загрузка списка существ...</p>
        )}
        {!isLoading && books.length === 0 && (
          <p className={styles.message}>Существа не найдены</p>
        )}
        {!isLoading && books.map((book) => (
          <ShowBookCreatureItem
            key={book.id}
            book={book}
            onClick={() => showBookDetails(book.id)}
          />
        ))}
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

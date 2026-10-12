import { useEffect, useState } from "react";
import {
  getBookCreature,
  initializeBookCreatures,
  useBookCreatures,
  type BookCreature,
  type BookCreatureFilters,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { BookCreaturePopup } from "@/04-features/book-creature-popup";
import { CreateBookCreature } from "@/04-features/create-book-creature";
import { ShowBookCreatureItem } from "@/04-features/show-book-creature-item";
import styles from "./index.module.css";

export const BookCreaturesFeed = () => {
  const books = useBookCreatures();
  const [filters] = useState<BookCreatureFilters>({});
  const [selectedBook, setSelectedBook] = useState<BookCreature | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showError = useErrorNotify();

  useEffect(() => {
    initializeBookCreatures()
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, []);

  const showBookDetails = async (bookId: number) => {
    try {
      setSelectedBook(await getBookCreature(bookId));
    } catch (error) {
      showError(error);
    }
  };

  const filteredBooks = books.filter(
    (book) => !filters.name || book.name.toLowerCase().includes(filters.name.toLowerCase())
  );

  return (
    <section className={styles.feed}>
      <div className={styles.header}>
        <h1 className={styles.title}>Существа книги</h1>
        <CreateBookCreature/>
      </div>

      <div className={styles.content}>
        {isLoading && (
          <p className={styles.message}>Загрузка списка существ...</p>
        )}
        {(!isLoading && filteredBooks.length) === 0 && (
          <p className={styles.message}>Существа не найдены</p>
        )}
        {!isLoading && filteredBooks.map((book) => (
          <ShowBookCreatureItem
            key={book.id}
            book={book}
            onClick={() => showBookDetails(book.id)}
          />
        ))}
      </div>

      <BookCreaturePopup
        bookCreature={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
};

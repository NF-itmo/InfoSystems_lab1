import { useCallback, useState } from "react";
import {
  getBookCreature,
  loadBookCreatures,
  useBookCreatures,
  type BookCreature,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { BookCreaturePopup } from "@/04-features/book-creature-popup";
import { CreateBookCreature } from "@/04-features/create-book-creature";
import { SearchBookCreatures } from "@/04-features/search-book-creatures";
import { ShowBookCreatureItem } from "@/04-features/show-book-creature-item";
import styles from "./index.module.css";

export const BookCreaturesFeed = () => {
  const books = useBookCreatures();
  const [selectedBook, setSelectedBook] = useState<BookCreature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showError = useErrorNotify();

  const search = useCallback(async (name: string) => {
    setIsLoading(true);

    try {
      await loadBookCreatures({ name: name || undefined });
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

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

      <BookCreaturePopup
        bookCreature={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
};

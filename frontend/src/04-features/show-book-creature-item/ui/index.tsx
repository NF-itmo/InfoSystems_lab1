import type { BookCreature } from "@/05-models/book-creatures";
import styles from "./index.module.css";

type Props = {
  book: BookCreature;
  onClick: () => void;
};

export const ShowBookCreatureItem = ({ book, onClick }: Props) => {
  return (
    <button className={styles.book} onClick={onClick}>
      <p className={styles.bookTitle}>
        #{book.id} - {book.name}
      </p >
      <p className={styles.type}>{book.creatureType} · возраст {book.age}</p>
      <div className={styles.stats}>
        <span>Атака: {book.attackLevel}</span>
        <span>Защита: {book.defenseLevel}</span>
      </div>
      <p className={styles.coordinates}>
        Координаты: {book.coordinates.x}, {book.coordinates.y}
      </p>
      <div className={styles.bookFooter}>
        <span>{book.creatureLocation?.name ?? "Без города"}</span>
        <span>{book.ring?.name ?? "Без кольца"}</span>
      </div>
    </button>
  );
};

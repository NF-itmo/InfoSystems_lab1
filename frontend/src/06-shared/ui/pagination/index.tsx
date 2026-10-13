import styles from "./index.module.css";

type Props = {
  page: number;
  hasNextPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export const Pagination = ({
  page,
  hasNextPage,
  onPrevious,
  onNext,
}: Props) => {
  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <button
        className={styles.button}
        type="button"
        aria-label="Предыдущая страница"
        disabled={page === 0}
        onClick={onPrevious}
      >
        {"[<]"}
      </button>
      
      <p className={styles.currentPage}>
        {page + 1}
      </p>
      
      <button
        className={styles.button}
        type="button"
        aria-label="Следующая страница"
        disabled={!hasNextPage}
        onClick={onNext}
      >
        {"[>]"}
      </button>
    </nav>
  );
};

import type { BookCreature } from "@/05-models/book-creatures";
import { getBookCreatureWithMaximumCoordinates } from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import styles from "./index.module.css";

type Props = {
  onFound: (bookCreature: BookCreature) => void;
};

export const FindBookCreatureWithMaximumCoordinates = ({ onFound }: Props) => {
  const showError = useErrorNotify();

  const find = async () => {
    try {
      onFound(await getBookCreatureWithMaximumCoordinates());
    } catch (error) {
      showError(error);
    }
  };

  return (
    <button className={styles.button} type="button" onClick={find}>
      <span className={styles.buttonBracket}>[</span>
      Макс. координаты
      <span className={styles.buttonBracket}>]</span>
    </button>
  );
};

import { useState } from "react";
import { getAverageDefenseLevel } from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupWindow } from "@/06-shared/ui/popups";
import styles from "./index.module.css";

export const CalculateAverageDefenseLevel = () => {
  const showError = useErrorNotify();
  const [averageDefenseLevel, setAverageDefenseLevel] = useState<number | null | undefined>(
    undefined
  );

  const calculate = async () => {
    try {
      const response = await getAverageDefenseLevel();
      setAverageDefenseLevel(response.averageDefenseLevel);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.button} onClick={calculate}>
        <span className={styles.buttonBracket}>[</span>
        Средняя защита
        <span className={styles.buttonBracket}>]</span>
      </button>

      {averageDefenseLevel !== undefined && (
        <PopupWindow
          name="Средний уровень защиты"
          onClose={() => setAverageDefenseLevel(undefined)}
        >
          <p className={styles.result}>
            {averageDefenseLevel === null
              ? "Существа книги отсутствуют" : averageDefenseLevel.toFixed(2)}
          </p>
        </PopupWindow>
      )}
    </>
  );
};

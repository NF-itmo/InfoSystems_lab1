import { useState } from "react";
import { takeRingsFromHobbits } from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupWindow } from "@/06-shared/ui/popups";
import styles from "./index.module.css";

type Props = {
  onCompleted: () => Promise<void>;
};

export const TakeRingsFromHobbits = ({ onCompleted }: Props) => {
  const showError = useErrorNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [affectedCount, setAffectedCount] = useState<number | null>(null);

  const open = () => {
    setAffectedCount(null);
    setIsOpen(true);
  };

  const takeRings = async () => {
    try {
      const response = await takeRingsFromHobbits();
      await onCompleted();
      setAffectedCount(response.affectedCount);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.button} onClick={open}>
        <span className={styles.buttonBracket}>[</span>
        Забрать кольца у хоббитов
        <span className={styles.buttonBracket}>]</span>
      </button>

      {isOpen && (
        <PopupWindow name="Забрать кольца у хоббитов" onClose={() => setIsOpen(false)}>
          {affectedCount === null ? (
            <>
              <p className={styles.description}>
                Кольца будут отвязаны от всех существ типа HOBBIT.
              </p>
              <PopupButton name="Забрать кольца" onClick={takeRings}/>
            </>
          ) : (
            <p className={styles.description}>
              Кольца забраны у существ: {affectedCount}
            </p>
          )}
        </PopupWindow>
      )}
    </>
  );
};

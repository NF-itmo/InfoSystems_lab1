import { useState } from "react";
import { getRingCountGreaterThan } from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";
import styles from "./index.module.css";

export const CountBookCreaturesWithMorePowerfulRing = () => {
  const showError = useErrorNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [power, setPower] = useState("");
  const [count, setCount] = useState<number | null>(null);

  const open = () => {
    setPower("");
    setCount(null);
    setIsOpen(true);
  };

  const calculate = async () => {
    const parsedPower = Number(power);

    if (!Number.isInteger(parsedPower) || parsedPower <= 0) {
      showError("Сила кольца должна быть положительным целым числом");
      return;
    }

    try {
      const response = await getRingCountGreaterThan(parsedPower);
      setCount(response.count);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.button} onClick={open}>
        <span className={styles.buttonBracket}>[</span>
        Кольца сильнее
        <span className={styles.buttonBracket}>]</span>
      </button>

      {isOpen && (
        <PopupWindow
          name="Количество существ с более сильным кольцом"
          onClose={() => setIsOpen(false)}
        >
          <PopupInput name="Минимальная сила кольца" value={power} setInput={setPower}/>
          <PopupButton name="Рассчитать" onClick={calculate}/>
          {count !== null && (
            <p className={styles.result}>Найдено существ: {count}</p>
          )}
        </PopupWindow>
      )}
    </>
  );
};

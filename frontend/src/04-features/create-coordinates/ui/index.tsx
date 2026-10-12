import { useState } from "react";
import { createCoordinates, upsertCoordinates } from "@/05-models/coordinates";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";
import styles from "./index.module.css";

export const CreateCoordinates = () => {
  const showError = useErrorNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const submit = async () => {
    const nextX = Number(x);
    const nextY = Number(y);

    if (!Number.isFinite(nextX) || !Number.isFinite(nextY)) {
      showError("Координаты должны быть числами");
      return;
    }

    try {
      const coordinates = await createCoordinates({ x: nextX, y: nextY });
      upsertCoordinates(coordinates);
      setX("");
      setY("");
      setIsOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>[+]</button>
      {isOpen && (
        <PopupWindow name="Новые координаты" onClose={() => setIsOpen(false)}>
          <PopupInput name="X" value={x} setInput={setX} autoFocus={true}/>
          <PopupInput name="Y" value={y} setInput={setY}/>
          <PopupButton name="Создать" onClick={submit}/>
        </PopupWindow>
      )}
    </>
  );
};

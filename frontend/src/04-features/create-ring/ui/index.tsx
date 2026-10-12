import { useState } from "react";
import { createRing, upsertRing } from "@/05-models/ring";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";
import styles from "./index.module.css";

export const CreateRing = () => {
  const showError = useErrorNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [weight, setWeight] = useState("");

  const submit = async () => {
    const ring = { name: name.trim(), power: Number(power), weight: Number(weight) };

    if (!ring.name || !Number.isFinite(ring.power) || !Number.isFinite(ring.weight)) {
      showError("Заполните название, мощность и вес кольца");
      return;
    }

    try {
      await createRing(ring);
      upsertRing(ring);
      setName("");
      setPower("");
      setWeight("");
      setIsOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>[+]</button>
      {isOpen && (
        <PopupWindow name="Новое кольцо" onClose={() => setIsOpen(false)}>
          <PopupInput name="Название" value={name} setInput={setName} autoFocus={true}/>
          <PopupInput name="Мощность" value={power} setInput={setPower}/>
          <PopupInput name="Вес" value={weight} setInput={setWeight}/>
          <PopupButton name="Создать" onClick={submit}/>
        </PopupWindow>
      )}
    </>
  );
};

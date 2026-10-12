import { useEffect, useState } from "react";
import {
  deleteBookCreature,
  removeBookCreature,
  type BookCreature,
  updateBookCreature,
  upsertBookCreature,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";
import styles from "./index.module.css";

type Props = {
  bookCreature: BookCreature | null;
  onClose: () => void;
};

export const BookCreaturePopup = ({ bookCreature, onClose }: Props) => {
  const showError = useErrorNotify();
  const [age, setAge] = useState("");
  const [attackLevel, setAttackLevel] = useState("");
  const [defenseLevel, setDefenseLevel] = useState("");

  useEffect(() => {
    setAge(String(bookCreature?.age ?? ""));
    setAttackLevel(String(bookCreature?.attackLevel ?? ""));
    setDefenseLevel(String(bookCreature?.defenseLevel ?? ""));
  }, [bookCreature]);

  const remove = async () => {
    if (!bookCreature) return;

    try {
      await deleteBookCreature(bookCreature.id);
      removeBookCreature(bookCreature.id);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  const update = async () => {
    if (!bookCreature) return;

    const nextBookCreature = {
      ...bookCreature,
      age: Number(age),
      attackLevel: Number(attackLevel),
      defenseLevel: Number(defenseLevel),
    };

    if (
      !Number.isInteger(nextBookCreature.age) ||
      nextBookCreature.age <= 0 ||
      !Number.isInteger(nextBookCreature.attackLevel) ||
      nextBookCreature.attackLevel <= 0 ||
      !Number.isInteger(nextBookCreature.defenseLevel) ||
      nextBookCreature.defenseLevel <= 0
    ) {
      showError("Возраст, атака и защита должны быть положительными целыми числами");
      return;
    }

    try {
      await updateBookCreature(bookCreature.id, {
        name: bookCreature.name,
        coordinatesId: bookCreature.coordinates.id,
        age: nextBookCreature.age,
        creatureType: bookCreature.creatureType,
        creatureLocationName: bookCreature.creatureLocation?.name,
        attackLevel: nextBookCreature.attackLevel,
        defenseLevel: nextBookCreature.defenseLevel,
        ringName: bookCreature.ring?.name,
      });
      upsertBookCreature(nextBookCreature);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  if (!bookCreature) return null;

  return (
    <PopupWindow name={bookCreature.name} onClose={onClose}>
      <p>Тип: {bookCreature.creatureType}</p>
      <p>Координаты: {bookCreature.coordinates.x}, {bookCreature.coordinates.y}</p>
      <div className={styles.description}>
        <p>Город: {bookCreature.creatureLocation?.name ?? "не выбран"}</p>
        <p>Кольцо: {bookCreature.ring?.name ?? "не выбрано"}</p>
      </div>
      <PopupInput name="Возраст" value={age} setInput={setAge} autoFocus={true}/>
      <PopupInput name="Атака" value={attackLevel} setInput={setAttackLevel}/>
      <PopupInput name="Защита" value={defenseLevel} setInput={setDefenseLevel}/>
      <PopupButton name="Сохранить" onClick={update}/>
      <PopupButton name="Удалить" onClick={remove}/>
    </PopupWindow>
  );
};

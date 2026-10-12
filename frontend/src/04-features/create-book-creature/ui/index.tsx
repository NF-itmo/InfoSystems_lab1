import { useState } from "react";
import {
  createBookCreature,
  getBookCreature,
  type BookCreatureType,
  upsertBookCreature,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import {
  PopupButton,
  PopupInput,
  PopupSelect,
  PopupWindow,
} from "@/06-shared/ui/popups";
import styles from "./index.module.css";

export const CreateBookCreature = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [name, setName] = useState("");
  const [coordinatesId, setCoordinatesId] = useState("");
  const [age, setAge] = useState("");
  const [creatureType, setCreatureType] = useState<BookCreatureType>("HOBBIT");
  const [creatureLocationName, setCreatureLocationName] = useState("");
  const [attackLevel, setAttackLevel] = useState("");
  const [defenseLevel, setDefenseLevel] = useState("");
  const [ringName, setRingName] = useState("");

  const showError = useErrorNotify();

  const reset = () => {
    setName("");
    setCoordinatesId("");
    setAge("");
    setCreatureType("HOBBIT");
    setCreatureLocationName("");
    setAttackLevel("");
    setDefenseLevel("");
    setRingName("");
  };

  const submit = async () => {
    const parsedCoordinatesId = Number(coordinatesId);
    const parsedAge = Number(age);
    const parsedAttackLevel = Number(attackLevel);
    const parsedDefenseLevel = Number(defenseLevel);

    if (!name.trim()) {
      showError("Введите имя существа");
      return;
    }

    if (!Number.isInteger(parsedCoordinatesId) || parsedCoordinatesId <= 0) {
      showError("ID координат должен быть положительным целым числом");
      return;
    }

    if (!Number.isInteger(parsedAge) || parsedAge <= 0 || parsedAttackLevel <= 0 || parsedDefenseLevel <= 0) {
      showError("Возраст, атака и защита должны быть больше нуля");
      return;
    }

    try {
      const { id } = await createBookCreature({
        name: name.trim(),
        coordinatesId: parsedCoordinatesId,
        age: parsedAge,
        creatureType,
        creatureLocationName: creatureLocationName.trim() || undefined,
        attackLevel: parsedAttackLevel,
        defenseLevel: parsedDefenseLevel,
        ringName: ringName.trim() || undefined,
      });
      upsertBookCreature(await getBookCreature(id));
      reset();
      setIsOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>
        [+]
      </button>

      {isOpen && (
        <PopupWindow name="Новое существо" onClose={() => setIsOpen(false)}>
          <PopupInput name="Имя" value={name} setInput={setName} autoFocus={true}/>
          <PopupInput name="ID координат" value={coordinatesId} setInput={setCoordinatesId}/>
          <PopupInput name="Возраст" value={age} setInput={setAge}/>
          <PopupSelect
            name="Тип существа"
            value={creatureType}
            setValue={(value) => setCreatureType(value as BookCreatureType)}
            options={[
              { value: "HOBBIT", label: "HOBBIT" },
              { value: "ELF", label: "ELF" },
              { value: "HUMAN", label: "HUMAN" },
            ]}
          />
          <PopupInput name="Атака" value={attackLevel} setInput={setAttackLevel}/>
          <PopupInput name="Защита" value={defenseLevel} setInput={setDefenseLevel}/>
          <PopupInput name="Город (необязательно)" value={creatureLocationName} setInput={setCreatureLocationName}/>
          <PopupInput name="Кольцо (необязательно)" value={ringName} setInput={setRingName}/>
          <PopupButton name="Создать" onClick={submit}/>
        </PopupWindow>
      )}
    </>
  );
};

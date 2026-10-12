import { useEffect, useState } from "react";
import {
  deleteBookCreature,
  getBookCreature,
  removeBookCreature,
  type BookCreature,
  type BookCreatureType,
  updateBookCreature,
  upsertBookCreature,
} from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import {
  PopupButton,
  PopupInput,
  PopupSelect,
  PopupWindow,
} from "@/06-shared/ui/popups";

type Props = {
  bookCreature: BookCreature | null;
  onClose: () => void;
};

export const BookCreaturePopup = ({ bookCreature, onClose }: Props) => {
  const showError = useErrorNotify();
  const [name, setName] = useState("");
  const [coordinatesId, setCoordinatesId] = useState("");
  const [age, setAge] = useState("");
  const [creatureType, setCreatureType] = useState<BookCreatureType>("HOBBIT");
  const [creatureLocationName, setCreatureLocationName] = useState("");
  const [attackLevel, setAttackLevel] = useState("");
  const [defenseLevel, setDefenseLevel] = useState("");
  const [ringName, setRingName] = useState("");

  useEffect(() => {
    setName(bookCreature?.name ?? "");
    setCoordinatesId(String(bookCreature?.coordinates.id ?? ""));
    setAge(String(bookCreature?.age ?? ""));
    setCreatureType(bookCreature?.creatureType ?? "HOBBIT");
    setCreatureLocationName(bookCreature?.creatureLocation?.name ?? "");
    setAttackLevel(String(bookCreature?.attackLevel ?? ""));
    setDefenseLevel(String(bookCreature?.defenseLevel ?? ""));
    setRingName(bookCreature?.ring?.name ?? "");
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
      name: name.trim(),
      coordinatesId: Number(coordinatesId),
      age: Number(age),
      creatureType,
      creatureLocationName: creatureLocationName.trim() || undefined,
      attackLevel: Number(attackLevel),
      defenseLevel: Number(defenseLevel),
      ringName: ringName.trim() || undefined,
    };

    if (
      !nextBookCreature.name ||
      !Number.isInteger(nextBookCreature.coordinatesId) ||
      nextBookCreature.coordinatesId <= 0 ||
      !Number.isInteger(nextBookCreature.age) ||
      nextBookCreature.age <= 0 ||
      !Number.isInteger(nextBookCreature.attackLevel) ||
      nextBookCreature.attackLevel <= 0 ||
      !Number.isInteger(nextBookCreature.defenseLevel) ||
      nextBookCreature.defenseLevel <= 0
    ) {
      showError("Заполните имя и ID координат; числовые поля должны быть положительными целыми числами");
      return;
    }

    try {
      await updateBookCreature(bookCreature.id, {
        name: nextBookCreature.name,
        coordinatesId: nextBookCreature.coordinatesId,
        age: nextBookCreature.age,
        creatureType: nextBookCreature.creatureType,
        creatureLocationName: nextBookCreature.creatureLocationName,
        attackLevel: nextBookCreature.attackLevel,
        defenseLevel: nextBookCreature.defenseLevel,
        ringName: nextBookCreature.ringName,
      });
      upsertBookCreature(await getBookCreature(bookCreature.id));
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  if (!bookCreature) return null;

  return (
    <PopupWindow name={bookCreature.name} onClose={onClose}>
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
      <PopupInput
        name="Город (необязательно)"
        value={creatureLocationName}
        setInput={setCreatureLocationName}
      />
      <PopupInput
        name="Кольцо (необязательно)"
        value={ringName}
        setInput={setRingName}
      />
      <PopupButton name="Сохранить" onClick={update}/>
      <PopupButton name="Удалить" onClick={remove}/>
    </PopupWindow>
  );
};

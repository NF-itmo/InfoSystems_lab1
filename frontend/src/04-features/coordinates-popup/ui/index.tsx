import { useEffect, useState } from "react";
import {
  deleteCoordinates,
  removeCoordinates,
  type Coordinates,
  updateCoordinates,
  upsertCoordinates,
} from "@/05-models/coordinates";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";

type Props = {
  coordinates: Coordinates | null;
  onClose: () => void;
};

export const CoordinatesPopup = ({ coordinates, onClose }: Props) => {
  const showError = useErrorNotify();
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  useEffect(() => {
    setX(String(coordinates?.x ?? ""));
    setY(String(coordinates?.y ?? ""));
  }, [coordinates]);

  if (!coordinates) return null;

  const update = async () => {
    const nextCoordinates = { ...coordinates, x: Number(x), y: Number(y) };

    if (!Number.isFinite(nextCoordinates.x) || !Number.isFinite(nextCoordinates.y)) {
      showError("Координаты должны быть числами");
      return;
    }

    try {
      await updateCoordinates(nextCoordinates);
      upsertCoordinates(nextCoordinates);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  const remove = async () => {
    try {
      await deleteCoordinates(coordinates.id);
      removeCoordinates(coordinates.id);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <PopupWindow name={`Координаты #${coordinates.id}`} onClose={onClose}>
      <PopupInput name="X" value={x} setInput={setX} autoFocus={true}/>
      <PopupInput name="Y" value={y} setInput={setY}/>
      <PopupButton name="Сохранить" onClick={update}/>
      <PopupButton name="Удалить" onClick={remove}/>
    </PopupWindow>
  );
};

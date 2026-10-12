import { useEffect, useState } from "react";
import { deleteRing, removeRing, type Ring, updateRing, upsertRing } from "@/05-models/ring";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";

type Props = {
  ring: Ring | null;
  onClose: () => void;
};

export const RingPopup = ({ ring, onClose }: Props) => {
  const showError = useErrorNotify();
  const [power, setPower] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    setPower(String(ring?.power ?? ""));
    setWeight(String(ring?.weight ?? ""));
  }, [ring]);

  if (!ring) return null;

  const update = async () => {
    const nextRing = { ...ring, power: Number(power), weight: Number(weight) };

    if (!Number.isFinite(nextRing.power) || !Number.isFinite(nextRing.weight)) {
      showError("Мощность и вес должны быть числами");
      return;
    }

    try {
      await updateRing(ring.name, nextRing);
      upsertRing(nextRing);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  const remove = async () => {
    try {
      await deleteRing(ring.name);
      removeRing(ring.name);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <PopupWindow name={ring.name} onClose={onClose}>
      <PopupInput name="Мощность" value={power} setInput={setPower} autoFocus={true}/>
      <PopupInput name="Вес" value={weight} setInput={setWeight}/>
      <PopupButton name="Сохранить" onClick={update}/>
      <PopupButton name="Удалить" onClick={remove}/>
    </PopupWindow>
  );
};

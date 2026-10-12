import { useEffect, useState } from "react";
import {
  deleteMagicCity,
  removeMagicCity,
  type MagicCity,
  updateMagicCity,
  upsertMagicCity,
} from "@/05-models/magic-city";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups";

type Props = {
  city: MagicCity | null;
  onClose: () => void;
};

export const MagicCityPopup = ({ city, onClose }: Props) => {
  const showError = useErrorNotify();
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [populationDensity, setPopulationDensity] = useState("");

  useEffect(() => {
    setArea(String(city?.area ?? ""));
    setPopulation(String(city?.population ?? ""));
    setPopulationDensity(String(city?.populationDensity ?? ""));
  }, [city]);

  if (!city) return null;

  const update = async () => {
    const nextCity = {
      ...city,
      area: Number(area),
      population: Number(population),
      populationDensity: Number(populationDensity),
    };

    if (
      !Number.isFinite(nextCity.area) ||
      !Number.isFinite(nextCity.population) ||
      !Number.isFinite(nextCity.populationDensity)
    ) {
      showError("Площадь, население и плотность должны быть числами");
      return;
    }

    try {
      await updateMagicCity(city.name, nextCity);
      upsertMagicCity(nextCity);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  const remove = async () => {
    try {
      await deleteMagicCity(city.name);
      removeMagicCity(city.name);
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <PopupWindow name={city.name} onClose={onClose}>
      <PopupInput name="Площадь" value={area} setInput={setArea} autoFocus={true}/>
      <PopupInput name="Население" value={population} setInput={setPopulation}/>
      <PopupInput name="Плотность населения" value={populationDensity} setInput={setPopulationDensity}/>
      <PopupButton name="Сохранить" onClick={update}/>
      <PopupButton name="Удалить" onClick={remove}/>
    </PopupWindow>
  );
};

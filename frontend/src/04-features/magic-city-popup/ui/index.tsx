import { useEffect, useState } from "react";
import {
  deleteMagicCity,
  removeMagicCity,
  type MagicCity,
  updateMagicCity,
  upsertMagicCity,
} from "@/05-models/magic-city";
import type { BookCreatureType } from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import {
  PopupButton,
  PopupCheckbox,
  PopupDateTimeInput,
  PopupInput,
  PopupSelect,
  PopupWindow
} from "@/06-shared/ui/popups";

type Props = {
  city: MagicCity | null;
  onClose: () => void;
};

export const MagicCityPopup = ({ city, onClose }: Props) => {
  const showError = useErrorNotify();
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [populationDensity, setPopulationDensity] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [governor, setGovernor] = useState<BookCreatureType>("HOBBIT");
  const [capital, setCapital] = useState(false);

  useEffect(() => {
    setArea(String(city?.area ?? ""));
    setPopulation(String(city?.population ?? ""));
    setPopulationDensity(String(city?.populationDensity ?? ""));
    setEstablishmentDate(city?.establishmentDate?.slice(0, 16) ?? "");
    setGovernor(city?.governor ?? "HOBBIT");
    setCapital(city?.capital ?? false);
  }, [city]);

  if (!city) return null;

  const update = async () => {
    const nextCity = {
      ...city,
      area: Number(area),
      population: Number(population),
      populationDensity: Number(populationDensity),
      establishmentDate: establishmentDate || undefined,
      governor,
      capital,
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
      <PopupDateTimeInput
        name="Дата основания (необязательно)"
        value={establishmentDate}
        setValue={setEstablishmentDate}
      />
      <PopupSelect
        name="Правитель"
        value={governor}
        setValue={(value) => setGovernor(value as BookCreatureType)}
        options={[
          { value: "HOBBIT", label: "HOBBIT" },
          { value: "ELF", label: "ELF" },
          { value: "HUMAN", label: "HUMAN" },
        ]}
      />
      <PopupCheckbox name="Столица" value={capital} setValue={setCapital}/>
      <PopupButton name="Сохранить" onClick={update}/>
      <PopupButton name="Удалить" onClick={remove}/>
    </PopupWindow>
  );
};

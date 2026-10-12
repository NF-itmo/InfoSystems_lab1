import { useState } from "react";
import { createMagicCity, upsertMagicCity } from "@/05-models/magic-city";
import type { BookCreatureType } from "@/05-models/book-creatures";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import {
  PopupButton,
  PopupCheckbox,
  PopupDateTimeInput,
  PopupInput,
  PopupSelect,
  PopupWindow,
} from "@/06-shared/ui/popups";
import styles from "./index.module.css";

export const CreateMagicCity = () => {
  const showError = useErrorNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [density, setDensity] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [governor, setGovernor] = useState<BookCreatureType>("HOBBIT");
  const [capital, setCapital] = useState(false);

  const submit = async () => {
    const city = {
      name: name.trim(),
      area: Number(area),
      population: Number(population),
      establishmentDate: establishmentDate || undefined,
      governor,
      capital,
      populationDensity: Number(density),
    };

    if (!city.name || !Number.isFinite(city.area) || !Number.isFinite(city.population) || !Number.isFinite(city.populationDensity)) {
      showError("Заполните название, площадь, население и плотность");
      return;
    }

    try {
      await createMagicCity(city);
      upsertMagicCity(city);
      setIsOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>[+]</button>
      {isOpen && (
        <PopupWindow name="Новый магический город" onClose={() => setIsOpen(false)}>
          <PopupInput name="Название" value={name} setInput={setName} autoFocus={true}/>
          <PopupInput name="Площадь" value={area} setInput={setArea}/>
          <PopupInput name="Население" value={population} setInput={setPopulation}/>
          <PopupInput name="Плотность" value={density} setInput={setDensity}/>
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
          <PopupButton name="Создать" onClick={submit}/>
        </PopupWindow>
      )}
    </>
  );
};

import { useCallback, useEffect, useState } from "react";
import { loadMagicCities, useMagicCities, type MagicCity } from "@/05-models/magic-city";
import { CreateMagicCity } from "@/04-features/create-magic-city";
import { MagicCityPopup } from "@/04-features/magic-city-popup";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { useDataUpdateVersion } from "@/06-shared/lib/data-updates";
import { DataTable, type DataTableColumn } from "@/06-shared/ui/data-table";
import styles from "./index.module.css";

const columns: DataTableColumn<MagicCity>[] = [
  { key: "name", title: "Название", render: (city) => city.name },
  { key: "area", title: "Площадь", render: (city) => city.area },
  { key: "population", title: "Население", render: (city) => city.population },
  {
    key: "establishmentDate",
    title: "Дата основания",
    render: (city) => city.establishmentDate ?? "-",
  },
  { key: "governor", title: "Правитель", render: (city) => city.governor },
  {
    key: "capital",
    title: "Столица",
    render: (city) => (city.capital ? "Да" : "Нет"),
  },
  {
    key: "populationDensity",
    title: "Плотность населения",
    render: (city) => city.populationDensity,
  },
];

export const MagicCitiesFeed = () => {
  const items = useMagicCities();
  const [selected, setSelected] = useState<MagicCity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showError = useErrorNotify();
  const dataUpdateVersion = useDataUpdateVersion();

  const reloadMagicCities = useCallback(async () => {
    setIsLoading(true);

    try {
      await loadMagicCities();
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void reloadMagicCities();
  }, [dataUpdateVersion, reloadMagicCities]);

  return (
    <section className={styles.feed}>
      <div className={styles.header}>
        <h2 className={styles.title}>Магические города</h2>
        <CreateMagicCity/>
      </div>

      <div className={styles.content}>
        {isLoading && (
          <p className={styles.message}>Загрузка списка городов...</p>
        )}
        {(!isLoading && items.length === 0 )&& (
          <p className={styles.message}>Города не найдены</p>
        )}
        {!isLoading && items.length > 0 && (
          <DataTable
            items={items}
            columns={columns}
            getRowKey={(city) => city.name}
            onRowClick={setSelected}
          />
        )}
      </div>

      <MagicCityPopup
        city={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

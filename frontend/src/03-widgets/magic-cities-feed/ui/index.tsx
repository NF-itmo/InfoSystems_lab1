import { useEffect, useState } from "react";
import { initializeMagicCities, useMagicCities, type MagicCity } from "@/05-models/magic-city";
import { CreateMagicCity } from "@/04-features/create-magic-city";
import { ShowMagicCityItem } from "@/04-features/show-magic-city-item";
import { MagicCityPopup } from "@/04-features/magic-city-popup";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import styles from "./index.module.css";

export const MagicCitiesFeed = () => {
  const items = useMagicCities();
  const [selected, setSelected] = useState<MagicCity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showError = useErrorNotify();

  useEffect(() => {
    initializeMagicCities()
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, []);

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
        {!isLoading && items.map((item) => (
          <ShowMagicCityItem
            key={item.name}
            city={item}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      <MagicCityPopup
        city={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

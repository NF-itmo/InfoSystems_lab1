import { useEffect, useState } from "react";
import { initializeRings, useRings, type Ring } from "@/05-models/ring";
import { CreateRing } from "@/04-features/create-ring";
import { ShowRingItem } from "@/04-features/show-ring-item";
import { RingPopup } from "@/04-features/ring-popup";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import styles from "./index.module.css";

export const RingsFeed = () => {
  const items = useRings();
  const [selected, setSelected] = useState<Ring | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showError = useErrorNotify();

  useEffect(() => {
    initializeRings()
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className={styles.feed}>
      <div className={styles.header}>
        <h2 className={styles.title}>Кольца</h2>
        <CreateRing/>
      </div>

      <div className={styles.content}>
        {isLoading && (
          <p className={styles.message}>Загрузка списка колец...</p>
        )}
        {(!isLoading && items.length === 0) && (
          <p className={styles.message}>Кольца не найдены</p>
        )}
        {!isLoading && items.map((item) => (
          <ShowRingItem
            key={item.name}
            ring={item}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      <RingPopup
        ring={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

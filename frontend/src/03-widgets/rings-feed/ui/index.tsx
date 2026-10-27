import { useCallback, useEffect, useState } from "react";
import { loadRings, useRings, type Ring } from "@/05-models/ring";
import { CreateRing } from "@/04-features/create-ring";
import { RingPopup } from "@/04-features/ring-popup";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { useDataUpdateVersion } from "@/06-shared/lib/data-updates";
import { DataTable, type DataTableColumn } from "@/06-shared/ui/data-table";
import styles from "./index.module.css";

const columns: DataTableColumn<Ring>[] = [
  { key: "name", title: "Название", render: (ring) => ring.name },
  { key: "power", title: "Сила", render: (ring) => ring.power },
  { key: "weight", title: "Вес", render: (ring) => ring.weight },
];

export const RingsFeed = () => {
  const items = useRings();
  const [selected, setSelected] = useState<Ring | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showError = useErrorNotify();
  const dataUpdateVersion = useDataUpdateVersion();

  const reloadRings = useCallback(async () => {
    setIsLoading(true);

    try {
      await loadRings();
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void reloadRings();
  }, [dataUpdateVersion, reloadRings]);

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
        {!isLoading && items.length > 0 && (
          <DataTable
            items={items}
            columns={columns}
            getRowKey={(ring) => ring.name}
            onRowClick={setSelected}
          />
        )}
      </div>

      <RingPopup
        ring={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

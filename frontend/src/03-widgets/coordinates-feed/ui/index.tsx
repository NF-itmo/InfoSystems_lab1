import { useEffect, useState } from "react";
import {
  initializeCoordinates,
  useCoordinates,
  type Coordinates
} from "@/05-models/coordinates";
import { CreateCoordinates } from "@/04-features/create-coordinates";
import { CoordinatesPopup } from "@/04-features/coordinates-popup";
import styles from "./index.module.css";
import { useErrorNotify } from "@/06-shared/lib/errorNotifier";
import { DataTable, type DataTableColumn } from "@/06-shared/ui/data-table";

const columns: DataTableColumn<Coordinates>[] = [
  { key: "id", title: "ID", render: (coordinates) => coordinates.id },
  { key: "x", title: "X", render: (coordinates) => coordinates.x },
  { key: "y", title: "Y", render: (coordinates) => coordinates.y },
];

export const CoordinatesFeed = () => {
  const items = useCoordinates();
  const [selected, setSelected] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showError = useErrorNotify();

  useEffect(() => {
    initializeCoordinates()
      .catch(showError)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className={styles.feed}>
      <div className={styles.header}>
        <h2 className={styles.title}>Координаты</h2>
        <CreateCoordinates/>
      </div>

      <div className={styles.content}>
        {isLoading && (
          <p className={styles.message}>Загрузка списка координат...</p>
        )}
        {(!isLoading && items.length === 0 )&& (
          <p className={styles.message}>Координаты не найдены</p>
        )}
        {!isLoading && items.length > 0 && (
          <DataTable
            items={items}
            columns={columns}
            getRowKey={(coordinates) => coordinates.id}
            onRowClick={setSelected}
          />
        )}
      </div>

      <CoordinatesPopup
        coordinates={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

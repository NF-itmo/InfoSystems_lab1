import type { ReactNode } from "react";
import styles from "./index.module.css";

export type DataTableColumn<Item> = {
  key: string;
  title: string;
  render: (item: Item) => ReactNode;
};

type props<Item> = {
  items: Item[];
  columns: DataTableColumn<Item>[];
  getRowKey: (item: Item) => string | number;
  onRowClick?: (item: Item) => void;
};

export const DataTable = <Item,>(
  {
    items,
    columns,
    getRowKey,
    onRowClick,
  }: props<Item>
) => {
  const openRow = (item: Item) => {
    onRowClick?.(item);
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={getRowKey(item)}
              className={onRowClick ? styles.clickableRow : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={() => openRow(item)}
              onKeyDown={(event) => {
                if (onRowClick && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  openRow(item);
                }
              }}
            >
              {columns.map((column) => (
                <td key={column.key}>{column.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
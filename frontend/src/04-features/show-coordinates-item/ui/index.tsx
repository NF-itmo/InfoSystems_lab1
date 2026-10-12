import type { Coordinates } from "@/05-models/coordinates";
import styles from "./index.module.css";

type Props = {
  coordinates: Coordinates;
  onClick: () => void;
};

export const ShowCoordinatesItem = ({ coordinates, onClick }: Props) => {
  return (
    <button className={styles.item} onClick={onClick}>
      <p className={styles.title}>Координаты #{coordinates.id}</p>
      <p className={styles.description}>X: {coordinates.x} · Y: {coordinates.y}</p>
    </button>
  );
};

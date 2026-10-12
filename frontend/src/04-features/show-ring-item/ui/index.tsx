import type { Ring } from "@/05-models/ring";
import styles from "./index.module.css";

type Props = {
  ring: Ring;
  onClick: () => void;
};

export const ShowRingItem = ({ ring, onClick }: Props) => {
  return (
    <button className={styles.item} onClick={onClick}>
      <p className={styles.title}>{ring.name}</p>
      <p className={styles.description}>Сила: {ring.power} | Вес: {ring.weight}</p>
    </button>
  );
};

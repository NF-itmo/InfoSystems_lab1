import type { MagicCity } from "@/05-models/magic-city";
import styles from "./index.module.css";

type Props = {
  city: MagicCity;
  onClick: () => void;
};

export const ShowMagicCityItem = ({ city, onClick }: Props) => {
  return (
    <button className={styles.item} onClick={onClick}>
      <p className={styles.title}>{city.name}</p>
      <p className={styles.description}>
        Население: {city.population} · {city.capital ? "столица" : "город"}
      </p>
    </button>
  );
};

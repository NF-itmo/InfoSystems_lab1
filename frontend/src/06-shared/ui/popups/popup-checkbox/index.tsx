import { useId } from "react";
import styles from "./index.module.css";

type props = {
  name: string;
  value: boolean;
  setValue: (value: boolean) => void;
};

export const PopupCheckbox = ({ name, value, setValue }: props) => {
  const id = useId();

  return (
    <label className={styles.field} htmlFor={id}>
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={value}
        onChange={(event) => setValue(event.target.checked)}
      />
      <span>{name}</span>
    </label>
  );
};

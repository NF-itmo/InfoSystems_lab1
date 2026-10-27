import { useId } from "react";
import styles from "../popup-input/index.module.css";

type option = {
  label: string;
  value: string;
};

type props = {
  name: string;
  value: string;
  options: option[];
  setValue: (value: string) => void;
};

export const PopupSelect = ({
  name,
  value,
  options,
  setValue,
}: props) => {
  const id = useId();

  return (
    <div className={styles.inputWrapper}>
      <select
        className={styles.input}
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className={styles.inputLabel} htmlFor={id}>
        {name}
      </label>
    </div>
  );
};

import { useId } from "react";
import styles from "../popup-input/index.module.css";

type Props = {
  name: string;
  value: string;
  setValue: (value: string) => void;
};

export const PopupDateTimeInput = ({ name, value, setValue }: Props) => {
  const id = useId();

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        id={id}
        type="datetime-local"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <label className={styles.inputLabel} htmlFor={id}>
        {name}
      </label>
    </div>
  );
};

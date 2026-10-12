import { useEffect, useState } from "react";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import styles from "./index.module.css";

type Props = {
  onSearch: (value: string) => void;
};

export const SearchBookCreatures = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 350);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <input
      className={styles.input}
      type="search"
      value={value}
      placeholder="Поиск по имени"
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

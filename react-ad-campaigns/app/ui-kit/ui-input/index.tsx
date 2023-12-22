import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import styles from "./ui-input.module.css";

interface UIInputInterface {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  error?: string;
}

export const UIInput: React.FC<UIInputInterface> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(styles.input, error && styles.error)}
      />
      <p>{error && error}</p>
    </div>
  );
};

import clsx from "clsx";
import styles from "./ui-button.module.css";

interface UIButtonInterface {
  variant: "green" | "red" | "small";
  content: string;
  onClick?: () => void;
  submit?: boolean;
  disabled?: boolean;
}

export const UIButton: React.FC<UIButtonInterface> = ({
  variant,
  content,
  onClick,
  submit,
  disabled,
}) => {
  const variantColors = {
    green: "green",
    red: "red",
    small: "rgb(54, 120, 182)",
  };
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled)}
      style={{ backgroundColor: variantColors[variant] }}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

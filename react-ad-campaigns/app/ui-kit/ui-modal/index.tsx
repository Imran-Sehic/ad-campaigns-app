import { ReactNode } from "react";
import CloseIcon from "../icons/closeIcon";
import styles from "./ui-modal.module.css";

interface UIModalInterface {
  children: ReactNode;
  onClose: () => void;
}

export const UIModal: React.FC<UIModalInterface> = ({ children, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.closeBanner}>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

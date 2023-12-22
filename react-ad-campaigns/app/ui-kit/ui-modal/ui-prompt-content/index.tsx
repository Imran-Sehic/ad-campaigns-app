import { UIButton } from "@/app/ui-kit/ui-button";
import styles from "./ui-prompt-content.module.css";

interface UIPromptContentInterface {
  prompt: string;
  accept: () => void;
  decline: () => void;
  promptDisabled: boolean;
}

export const UIPromptContent: React.FC<UIPromptContentInterface> = ({
  prompt,
  accept,
  decline,
  promptDisabled,
}) => {
  return (
    <div className={styles.wrapper}>
      <p>{prompt}</p>
      <div className={styles.buttons}>
        <UIButton
          variant="green"
          content="Yes"
          onClick={accept}
          disabled={promptDisabled}
        />
        <UIButton
          variant="red"
          content="No"
          onClick={decline}
          disabled={promptDisabled}
        />
      </div>
    </div>
  );
};

import { Button } from "@radix-ui/themes";
import styles from "./SubmitButton.module.scss";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const SubmitButton = ({
  onClick,
  children,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <Button
      type="button"
      style={{ backgroundColor: "black" }}
      className={styles.Button}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

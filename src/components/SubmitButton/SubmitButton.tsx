import { Button, ButtonProps } from "@radix-ui/themes";
import styles from "./SubmitButton.module.scss";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const SubmitButton = ({
  children,
  ...buttonProps
}: {
  children: string;
} & ButtonProps) => {
  return (
    <Button
      radius="full"
      type="submit"
      style={{ backgroundColor: "black" }}
      className={styles.Button}
      {...buttonProps}
    >
      {children}
      <PlusCircledIcon />
    </Button>
  );
};

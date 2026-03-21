import { Button, ButtonProps } from "@radix-ui/themes";
import styles from "./SubmitButton.module.scss";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const SubmitButton = ({ children, ...buttonProps }: ButtonProps) => {
  return (
    <Button
      radius="full"
      type="submit"
      mt="2"
      style={{ ...(buttonProps?.disabled ? {} : { backgroundColor: "black" }) }}
      className={styles.Button}
      {...buttonProps}
    >
      {children}
      <PlusCircledIcon />
    </Button>
  );
};

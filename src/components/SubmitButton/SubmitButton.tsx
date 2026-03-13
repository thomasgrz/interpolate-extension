import { Button, ButtonProps } from "@radix-ui/themes";
import styles from "./SubmitButton.module.scss";
import { baseButtonPropDefs } from "@radix-ui/themes/components/_internal/base-button.props";
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

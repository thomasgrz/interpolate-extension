import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import styles from "./InterpolationOptions.module.scss";

export const InterpolationOptions = ({
  config,
}: {
  config: AnyInterpolation;
}) => {
  const handleCopyConfig = () => {
    const json = JSON.stringify(config);
    const data = [new ClipboardItem({ "text/plain": json })];

    navigator.clipboard.write(data);
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton className={styles.Button} variant="outline">
          <DotsHorizontalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={handleCopyConfig}>
          Copy config
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

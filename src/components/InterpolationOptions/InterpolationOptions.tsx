import { DropdownMenu, IconButton } from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  GearIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";
import styles from "./InterpolationOptions.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const InterpolationOptions = ({
  config,
  onEditSelected,
}: {
  config: AnyInterpolation;
  onEditSelected: () => void;
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
          <ClipboardCopyIcon /> Copy
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={onEditSelected}>
          <GearIcon /> Edit
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

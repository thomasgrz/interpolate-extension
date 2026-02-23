import { DropdownMenu, IconButton } from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  GearIcon,
  ClipboardCopyIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import styles from "./InterpolationOptions.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

export const InterpolationOptions = ({
  config,
  onEditSelected,
  onDeleteSelected,
}: {
  config: AnyInterpolation;
  onEditSelected: () => void;
  onDeleteSelected: () => void;
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
        <DropdownMenu.Item onSelect={onDeleteSelected}>
          <TrashIcon /> Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

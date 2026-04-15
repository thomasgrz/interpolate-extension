import { DropdownMenu, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  GearIcon,
  ClipboardCopyIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import styles from "./InterpolationOptions.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { GroupConfigInStorage } from "#src/utils/factories/InterpolationGroup.ts";

export const InterpolationOptions = ({
  config,
  disableAddToGroup,
  onEditSelected,
  onDeleteSelected,
}: {
  config:
    | AnyInterpolation
    | AnyInterpolation[]
    | (GroupConfigInStorage & { interpolations: AnyInterpolation[] });
  disableAddToGroup?: boolean;
  onEditSelected: (
    config?: AnyInterpolation | AnyInterpolation[] | GroupConfigInStorage,
  ) => void;
  onDeleteSelected: () => void;
}) => {
  const { groups, addToGroup } = useInterpolationsContext();
  const handleCopyConfig = () => {
    const isGroup = !Array.isArray(config) && config.type === "group";
    let strippedConfig = {};
    if (isGroup) {
      strippedConfig = config.interpolations?.map((interp) => {
        const { id, ...details } = interp.details;
        const { enabledByUser, createdAt, error, isActive, ...rest } = interp;

        return {
          ...rest,
          details,
        };
      });
    } else if (Array.isArray(config)) {
      strippedConfig = config.map((interp) => {
        const { id, ...details } = interp.details;
        const { enabledByUser, createdAt, error, isActive, ...rest } = interp;

        return {
          ...rest,
          details,
        };
      });
    } else if (config.type !== "group") {
      const { id, ...details } = config.details;
      const { enabledByUser, createdAt, error, isActive, ...rest } = config;

      strippedConfig = {
        ...rest,
        details,
      };
    }
    const json = JSON.stringify(strippedConfig);
    const data = [new ClipboardItem({ "text/plain": json })];

    navigator.clipboard.write(data);
  };

  const handleEditSelected = () => {
    onEditSelected(config);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          data-testid={"interpolation-options-trigger"}
          className={styles.Button}
          variant="outline"
        >
          <Tooltip content="Show options">
            <DotsHorizontalIcon />
          </Tooltip>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={handleCopyConfig}>
          <ClipboardCopyIcon /> Copy
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={handleEditSelected}>
          <GearIcon /> Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={onDeleteSelected}>
          <TrashIcon /> Delete
        </DropdownMenu.Item>
        {disableAddToGroup ? null : (
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Add to group</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {groups.map((group) => (
                <DropdownMenu.Item
                  onClick={() => {
                    addToGroup({ interps: config, groupName: group.name });
                  }}
                >
                  <Flex wrap="wrap">{group.name}</Flex>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

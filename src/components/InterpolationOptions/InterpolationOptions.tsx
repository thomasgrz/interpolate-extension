import { ContextMenu, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  GearIcon,
  ClipboardCopyIcon,
  TrashIcon,
  CheckCircledIcon,
  ButtonIcon,
} from "@radix-ui/react-icons";
import styles from "./InterpolationOptions.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { GroupConfigInStorage } from "#src/utils/factories/InterpolationGroup.ts";

export const InterpolationOptions = ({
  children,
  config,
  disableAddToGroup,
  onEditSelected,
  onDeleteSelected,
}: {
  children: React.ReactElement;
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
  const { groups, addToGroup, setShowGroups } = useInterpolationsContext();
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

  const associatedGroupIds =
    !Array.isArray(config) &&
    config.type !== "group" &&
    groups
      .filter((group) => group.interpolationIds.includes(config?.details?.id))
      .map((group) => group.groupId);
  const associatedGroupIdSet = associatedGroupIds
    ? new Set(associatedGroupIds)
    : new Set();

  const hideAddToGroupOption = disableAddToGroup || !groups.length;
  return (
    <ContextMenu.Content>
      <ContextMenu.Item onSelect={handleCopyConfig}>
        <ClipboardCopyIcon /> Copy
      </ContextMenu.Item>
      <ContextMenu.Item onSelect={handleEditSelected}>
        <GearIcon /> Edit
      </ContextMenu.Item>
      <ContextMenu.Item onSelect={onDeleteSelected}>
        <TrashIcon /> Delete
      </ContextMenu.Item>
      {hideAddToGroupOption ? null : (
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Add to group</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            {groups.map((group) => (
              <ContextMenu.Item
                onClick={() => {
                  addToGroup({
                    interps: config,
                    groupId: group.groupId,
                    onSuccess: () => setShowGroups(true),
                  });
                }}
              >
                <Flex
                  width="stretch"
                  wrap="wrap"
                  align="center"
                  justify={"between"}
                  gap="3"
                >
                  {group.name}
                  {associatedGroupIdSet.has(group.groupId) && (
                    <CheckCircledIcon />
                  )}
                </Flex>
              </ContextMenu.Item>
            ))}
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
      )}
    </ContextMenu.Content>
  );
};

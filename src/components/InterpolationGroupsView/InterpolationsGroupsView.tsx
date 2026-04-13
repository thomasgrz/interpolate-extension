import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Separator,
  Strong,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { InterpolationOptions } from "../InterpolationOptions/InterpolationOptions";
import { RuleDeleteAction } from "../RuleDeleteAction/RuleDeleteAction";
import { CreateGroupView } from "../CreateGroupView/CreateGroupView";
import { SortOption } from "../SortingOptions/SortingOptions";
import { sortInterpolations } from "#src/utils/sortInterpolations.ts";
import { Collapsible } from "radix-ui";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { GroupConfigInStorage } from "#src/utils/factories/InterpolationGroup.ts";

export const InterpolationsGroupsView = ({
  sortOption,
  query,
}: {
  sortOption?: SortOption;
  query?: string;
}) => {
  const { groups, removeGroup } = useInterpolationsContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hydratedGroups, setHydratedGroups] = useState<
    | { createdAt: number; name: string; interpolations: AnyInterpolation[] }[]
    | []
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedGroups, setEpxandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const [showGroupEditModal, setShowGroupEditModal] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  useEffect(() => {
    const hydrateGroups = async () => {
      return Promise.all(
        groups?.map(async (group) => {
          const { interpolationIds, ...rest } = group;
          const interpolations = await chrome.storage.local.get(
            interpolationIds?.map(InterpolateStorage.getInterpolationRecordKey),
          );
          return {
            ...rest,
            interpolations: Object.values(interpolations),
          };
        }),
      );
    };

    hydrateGroups().then((hydrated) => {
      setHydratedGroups(hydrated);
      setLoading(false);
    });
  }, [groups]);

  const onEditSelected = (config: GroupConfigInStorage) => {
    setShowGroupEditModal(true);
    setEditGroup(config);
  };

  const onDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const onDelete = (groupId: string) => {
    setShowDeleteModal(false);
    removeGroup(groupId);
  };

  const sortedHydratedGroups = useMemo(() => {
    return sortInterpolations(hydratedGroups, sortOption).filter((group) =>
      group.name?.toLowerCase?.()?.includes(query ?? ""),
    ) as (GroupConfigInStorage & { interpolations: AnyInterpolation[] })[];
  }, [hydratedGroups, sortOption, query]);
  const noGroups = !loading && !hydratedGroups.length;
  const onGroupOpenChange = (groupName: string, isOpen: boolean) => {
    setEpxandedGroups((prevState) => ({ ...prevState, [groupName]: isOpen }));
  };

  return (
    <Flex direction="column" gap="2" p="2">
      <CreateGroupView
        onOpenChange={(isOpen) => setShowGroupEditModal(false)}
        forceOpen={showGroupEditModal}
        hideTrigger
        config={editGroup}
      />
      {query && (
        <Text size="1">
          Showing {sortedHydratedGroups?.length} groups matching "{query}"
        </Text>
      )}
      {sortedHydratedGroups.map((config, index) => (
        <>
          <Card variant="surface">
            <Flex justify="center" gap="1" direction="column">
              <Flex width="stretch" justify={"between"}>
                <Flex direction="column">
                  <Strong>
                    <Text size="2">{config.name}</Text>
                  </Strong>
                  <Text size="1">
                    Created: {new Date(config.createdAt).toDateString()}
                  </Text>
                </Flex>

                <InterpolationOptions
                  disableAddToGroup
                  onDeleteSelected={onDeleteSelected}
                  onEditSelected={onEditSelected}
                  config={{
                    groupName: config.name,
                    interpolations: config.interpolations,
                  }}
                />
              </Flex>
              <Flex width="stretch" direction="column">
                <Collapsible.Root
                  open={expandedGroups[config.name]}
                  onOpenChange={(isOpen) =>
                    onGroupOpenChange(config.name, isOpen)
                  }
                >
                  <Flex width="stretch" justify="end">
                    <Tooltip
                      content={
                        expandedGroups[config.name]
                          ? "hide configs in group"
                          : "show configs in group"
                      }
                    >
                      <Collapsible.Trigger asChild>
                        <Button
                          // className={styles.ToggleCollapse}
                          size="1"
                          radius="none"
                          variant="outline"
                          // TODO: rm inline styles when prod build doesnt break className styles
                          style={{ height: "unset", boxShadow: "none" }}
                        >
                          {expandedGroups[config.name] ? (
                            <>
                              Collapse <DoubleArrowUpIcon />{" "}
                            </>
                          ) : (
                            <>
                              {config.interpolations?.length} config
                              {config.interpolations.length > 1 ? "s" : ""}
                              <DoubleArrowDownIcon />
                            </>
                          )}
                        </Button>
                      </Collapsible.Trigger>
                    </Tooltip>
                  </Flex>

                  <Collapsible.Content>
                    <Flex width="stretch" justify="start">
                      <InterpolationsListView configs={config.interpolations} />
                    </Flex>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Flex>
            </Flex>
          </Card>

          <RuleDeleteAction
            hideTrigger
            title="Delete this group?"
            info="This will not delete the interpolations"
            onDelete={() => onDelete(config.groupId)}
            open={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
          />
          <Separator size="4" />
        </>
      ))}
      {noGroups && (
        <Box mt="30px">
          <Text size="2">No groups yet</Text>
        </Box>
      )}
    </Flex>
  );
};

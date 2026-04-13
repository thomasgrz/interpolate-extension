import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Separator,
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

export const InterpolationsGroupsView = ({
  sortOption,
}: {
  sortOption?: SortOption;
}) => {
  const { groups, removeGroup } = useInterpolationsContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [hydratedGroups, setHydratedGroups] = useState<
    | { createdAt: number; name: string; interpolations: AnyInterpolation[] }[]
    | []
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      setShowLoading(false);
    });
  }, [groups]);

  const onEditSelected = () => {};

  const onDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const onDelete = (groupId: string) => {
    setShowDeleteModal(false);
    removeGroup(groupId);
  };

  const sortedHydratedGroups = useMemo(() => {
    return sortInterpolations(hydratedGroups, sortOption);
  }, [hydratedGroups, sortOption]);
  const noGroups = !loading && !hydratedGroups.length;
  return (
    <Flex direction="column" gap="2" p="2">
      {sortedHydratedGroups.map((config, index) => (
        <>
          <Card variant="surface">
            <Flex justify="center" gap="1" direction="column">
              <Flex width="stretch" justify={"between"}>
                <Heading size="2">{config.name}</Heading>
                <InterpolationOptions
                  onDeleteSelected={onDeleteSelected}
                  onEditSelected={onEditSelected}
                  config={config.interpolations}
                />
              </Flex>
              <InterpolationsListView configs={config.interpolations} />
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
          <CreateGroupView hideTrigger />
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

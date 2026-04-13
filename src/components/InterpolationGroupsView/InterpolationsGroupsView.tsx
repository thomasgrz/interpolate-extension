import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView";

export const InnterpolationsGroupsView = () => {
  const { groups } = useInterpolationsContext();

  const [hydratedGroups, setHydratedGroups] = useState([]);
  console.log({ groups });

  useEffect(() => {
    const hydrateGroups = async () => {
      return Promise.all(
        groups?.map(async (group) => {
          const { interpolationIds, ...rest } = group;
          const interpolations = await chrome.storage.local.get(
            interpolationIds.map(InterpolateStorage.getInterpolationRecordKey),
          );
          return {
            ...rest,
            interpolations: Object.values(interpolations),
          };
        }),
      );
    };

    hydrateGroups().then((hydrated) => setHydratedGroups(hydrated));
  }, [groups]);

  console.log({ hydratedGroups, groups });
  return (
    <Flex direction="column" gap="2" p="2">
      {hydratedGroups.map((config) => (
        <>
          <Card variant="surface">
            <Flex justify="center" gap="1" direction="column">
              <Flex width="stretch">
                <Heading size="1">{config.name}</Heading>
              </Flex>
              <InterpolationsListView configs={config.interpolations} />
            </Flex>
          </Card>
          <Separator size="4" />
        </>
      ))}
    </Flex>
  );
};

import { Flex, Box, Tabs } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./InterpolationsList.module.scss";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";

export const InterpolationsList = () => {
  const { interpolations, recentlyActive, ...args } =
    useInterpolationsContext();

  return (
    <Flex width="100%" p="1" direction={"row"} wrap="wrap">
      <Tabs.Root className={styles.TabsRoot} defaultValue="all">
        <Tabs.List>
          <Flex className={styles.Tabs} justify={"center"}>
            <Tabs.Trigger value="all">All interpolations</Tabs.Trigger>
            <Tabs.Trigger value="active">Active in tab</Tabs.Trigger>
          </Flex>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="all">
            {interpolations?.map?.((interpolation) => (
              <Box
                key={interpolation.details?.id}
                p="1"
                className={styles.InterpolationsCardContainer}
              >
                <Flex gap="3">
                  <InterpolationCard info={interpolation} />
                </Flex>
              </Box>
            ))}
          </Tabs.Content>
          <Tabs.Content value="active">
            {recentlyActive?.map?.((interpolation) => (
              <Box
                key={interpolation.details?.id + "-active"}
                p="1"
                className={styles.InterpolationsCardContainer}
              >
                <Flex gap="3">
                  <InterpolationCard info={interpolation} />
                </Flex>
              </Box>
            ))}{" "}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
};

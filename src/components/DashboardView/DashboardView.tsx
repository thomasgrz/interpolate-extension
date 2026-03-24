import { Callout, Container, Flex, Tabs } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./DashboardView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";

export const DashboardView = () => {
  const { interpolations, recentlyActive } = useInterpolationsContext();

  return (
    <ErrorBoundary
      onError={console.error}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          Something went wrong
        </Callout.Root>
      }
    >
      <Container pb="50px" className={styles.Container} minHeight={"100dvh"}>
        <Flex
          p="0"
          minHeight={"100dvh"}
          flexGrow={"1"}
          justify={"start"}
          direction={"column"}
        >
          <Tabs.Root className={styles.TabsRoot} defaultValue="all">
            <Flex
              direction="column"
              className={styles.DashboardControls}
              align={"center"}
              justify="center"
            >
              <ControlCenter />
              <Tabs.List>
                <Flex className={styles.Tabs} justify={"center"}>
                  <Tabs.Trigger value="all">All interpolations</Tabs.Trigger>
                  <Tabs.Trigger value="active">Active in tab</Tabs.Trigger>
                </Flex>
              </Tabs.List>
            </Flex>
            <Tabs.Content value="all">
              <InterpolationsListView configs={interpolations} />
            </Tabs.Content>
            <Tabs.Content value="active">
              <InterpolationsListView configs={recentlyActive} />
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

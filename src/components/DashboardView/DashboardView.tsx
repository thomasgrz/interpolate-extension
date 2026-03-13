import { Callout, Container, Flex } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./DashboardView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";

export const DashboardView = () => {
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
          p="1"
          minHeight={"100dvh"}
          flexGrow={"1"}
          justify={"start"}
          direction={"column"}
        >
          <Flex className={styles.FormArea} justify="center">
            <ControlCenter />
          </Flex>
          <InterpolationsListView />
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

import { Callout, Container, Flex } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./Dashboard.module.scss";
import { InterpolationsList } from "../InterpolationsList/InterpolationsList.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";

export const Dashboard = () => {
  return (
    <ErrorBoundary
      onError={console.error}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          Something went wrong
        </Callout.Root>
      }
    >
      <Container className={styles.Container} minHeight={"100dvh"}>
        <Flex
          minHeight={"100dvh"}
          flexGrow={"1"}
          justify={"start"}
          direction={"column"}
        >
          <Flex justify="center">
            <ControlCenter />
          </Flex>
          <InterpolationsList />
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

import {
  Box,
  Callout,
  Flex,
  SegmentedControl,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DashboardControls } from "../DashboardControls/DashboardControls";
import { HeaderForm } from "../HeaderForm/HeaderForm";
import { RedirectForm } from "../RedirectForm/RedirectForm";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";
import { ScriptForm } from "../ScriptForm/ScriptForm";
import styles from "./Dashboard.module.scss";
import { useInterpolateFormSelection } from "@/hooks/useInterpolateFormSelection/useInterpolateFormSelection";
import { useInterpolationForm } from "@/hooks/useInterpolationForm/useInterpolationForm";
import { FormType } from "@/constants";
import { InterpolateContext } from "@/contexts/interpolate-context";
import { RocketIcon } from "@radix-ui/react-icons";

export const Dashboard = ({ showRules = true }: { showRules?: boolean }) => {
  const form = useInterpolationForm();

  const { selectedForm, setSelectedForm } = useInterpolateFormSelection(
    FormType.REDIRECT,
  );

  const { interpolations, pauseAll, resumeAll, removeAll, allPaused } =
    useContext(InterpolateContext);

  const handleAllPaused = async () => {
    pauseAll();
  };

  const handleAllResumed = async () => {
    resumeAll();
  };

  const handleDeleteAll = () => {
    removeAll();
  };

  const handleFormSelection = (selectedForm: FormType) => {
    setSelectedForm(selectedForm);
    form.reset();
  };

  const shouldShowRules = showRules && !!interpolations?.length;

  return (
    <ErrorBoundary
      onError={console.error}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          Something went wrong
        </Callout.Root>
      }
    >
      <Box data-testid={"dashboard"} p="2">
        <Flex p="1" justify={"center"}>
          <Box height={"1rem"}>
            <RocketIcon />
          </Box>
        </Flex>
        <SegmentedControl.Root
          variant="classic"
          radius="full"
          onValueChange={handleFormSelection}
          size="2"
          value={selectedForm}
        >
          <SegmentedControl.Item value={FormType.REDIRECT}>
            <Text size="2">Redirect</Text>
          </SegmentedControl.Item>
          <SegmentedControl.Item value={FormType.HEADER}>
            Header
          </SegmentedControl.Item>
          <SegmentedControl.Item value={FormType.SCRIPT}>
            Script
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>
      <Flex height={"100%"} direction="column" flexGrow={"1"}>
        <form>
          {selectedForm === FormType.REDIRECT && <RedirectForm form={form} />}
          {selectedForm === FormType.HEADER && <HeaderForm form={form} />}
          {selectedForm === FormType.SCRIPT && <ScriptForm form={form} />}
        </form>
      </Flex>
      <DashboardControls
        ruleCount={interpolations?.length}
        allPaused={!!allPaused}
        onResumeAllRules={handleAllResumed}
        onPauseAllRules={handleAllPaused}
        onDeleteAllRules={handleDeleteAll}
      />
      <Separator size={"4"} my="1" />
      <Flex
        width="100%"
        p="1"
        flexGrow={"1"}
        direction={"column"}
        wrap="wrap"
        justify={"between"}
      >
        {shouldShowRules &&
          interpolations?.map((rule) => {
            return (
              <Box
                key={rule.details?.id}
                width={"100%"}
                p="1"
                className={styles.RuleCardContainer}
              >
                <InterpolationCard info={rule} />
              </Box>
            );
          })}
      </Flex>
    </ErrorBoundary>
  );
};

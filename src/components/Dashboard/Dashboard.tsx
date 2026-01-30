import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  IconButton,
  SegmentedControl,
  Strong,
  DropdownMenu,
} from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";
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
import { Import } from "../Import/Import.tsx";
import { Exporter } from "../Exporter/Exporter.tsx";
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
      <Container className={styles.Container} minHeight={"100dvh"}>
        <Flex
          minHeight={"100dvh"}
          flexGrow={"1"}
          justify={"start"}
          direction={"column"}
        >
          <Flex p="2" className={styles.ImportExportCTAs} justify="between">
            <Import />
            <Exporter
              interpolations={interpolations}
              disabled={!interpolations?.length}
            />
          </Flex>
          <Flex
            gap="2"
            wrap
            direction={"column"}
            flexGrow={"1"}
            data-testid={"dashboard"}
            justify={"start"}
            p="3"
          >
            <SegmentedControl.Root
              variant="surface"
              radius="full"
              onValueChange={handleFormSelection}
              size="2"
              value={selectedForm}
            >
              <SegmentedControl.Item
                style={{ cursor: "pointer" }}
                value={FormType.REDIRECT}
              >
                <Strong>Redirect</Strong>
              </SegmentedControl.Item>
              <SegmentedControl.Item
                style={{ cursor: "pointer" }}
                value={FormType.HEADER}
              >
                <Strong>Header</Strong>
              </SegmentedControl.Item>
              <SegmentedControl.Item
                style={{ cursor: "pointer" }}
                value={FormType.SCRIPT}
              >
                <Strong>Script</Strong>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
            <Card variant="surface">
              <Flex height={"100%"} direction="column" flexGrow={"1"}>
                <form>
                  {selectedForm === FormType.REDIRECT && (
                    <RedirectForm form={form} />
                  )}
                  {selectedForm === FormType.HEADER && (
                    <HeaderForm form={form} />
                  )}
                  {selectedForm === FormType.SCRIPT && (
                    <ScriptForm form={form} />
                  )}
                </form>
              </Flex>
            </Card>
            <Flex direction="row" width="100%"></Flex>
            <DashboardControls
              ruleCount={interpolations?.length}
              allPaused={!!allPaused}
              onResumeAllRules={handleAllResumed}
              onPauseAllRules={handleAllPaused}
              onDeleteAllRules={handleDeleteAll}
            />
            <Flex width="100%" p="1" direction={"row"} wrap="wrap">
              {shouldShowRules &&
                interpolations?.map((rule) => {
                  return (
                    <Box
                      key={rule.details?.id}
                      p="1"
                      className={styles.RuleCardContainer}
                    >
                      <InterpolationCard info={rule} />
                    </Box>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

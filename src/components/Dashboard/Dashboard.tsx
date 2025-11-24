import {
  Box,
  Callout,
  Flex,
  SegmentedControl,
  Separator,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { DashboardControls } from "../DashboardControls/DashboardControls";
import { HeaderForm } from "../HeaderForm/HeaderForm";
import { RedirectForm } from "../RedirecForm/RedirectForm";
import { InterpolationCard } from "../RuleCard/InterpolationCard";
import { ScriptForm } from "../ScriptForm/ScriptForm";
import styles from "./Dashboard.module.scss";
import { useInterpolateFormSelection } from "@/hooks/useInterpolateFormSelection/useInterpolateFormSelection";
import { useInterpolationForm } from "@/hooks/useInterpolationForm/useInterpolationForm";
import { FormType } from "@/constants";

export const Dashboard = ({ showRules = true }: { showRules?: boolean }) => {
  const [displayedRules, setDisplayedRules] = useState<AnyInterpolation[]>([]);
  const [allPaused, setAllPaused] = useState<boolean | null>(null);
  const form = useInterpolationForm();
  const { selectedForm, setSelectedForm } = useInterpolateFormSelection(
    FormType.REDIRECT,
  );

  const getIsEveryRulePaused = async () => {
    const rulesInStorage = await InterpolateStorage.getAllInterpolations();
    const isEveryRulePaused = rulesInStorage?.every(
      (rule) => rule?.enabledByUser === false,
    );

    return !!isEveryRulePaused;
  };

  useEffect(() => {
    const getInitAllPaused = async () => {
      const isEveryRulePaused = await getIsEveryRulePaused();
      setAllPaused(isEveryRulePaused);
    };

    getInitAllPaused();
  }, []);

  useEffect(() => {
    const getInitialRulesFromStorage = async () => {
      const allRules = (await InterpolateStorage.getAllInterpolations()) ?? [];
      setDisplayedRules(allRules);
    };

    getInitialRulesFromStorage();
  }, []);

  useEffect(() => {
    InterpolateStorage.subscribeToChanges(
      async ({ headers, redirects, scripts }) => {
        setDisplayedRules([...headers, ...redirects, ...scripts]);
        const isEveryRulePaused = await getIsEveryRulePaused();
        setAllPaused(isEveryRulePaused);
      },
    );
  }, []);

  const handleAllPaused = async () => {
    try {
      setAllPaused(true);
      await InterpolateStorage.disableAll();
      logger("handleAllPaused: all rules paused successfully.");
    } catch (e) {
      logger(`handleAllPaused: failed with error: ${e}`);
    }
  };

  const handleAllResumed = async () => {
    try {
      setAllPaused(false);
      await InterpolateStorage.enableAll();
      logger("handleAllResumed: all rules resumed successfully");
    } catch (e) {
      logger(`handleAllResumed: failed with error: ${e}`);
    }
  };

  const rulesSortedByCreationTime = () =>
    displayedRules?.sort((item1, item2) => {
      return item2.createdAt - item1.createdAt;
    });

  const handleFormSelection = (selectedForm: FormType) => {
    setSelectedForm(selectedForm);
    form.reset();
  };

  const handleDeleteAll = async () => {
    await InterpolateStorage.deleteAll();
  };

  return (
    <ErrorBoundary
      onError={console.error}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          Something went wrong
        </Callout.Root>
      }
    >
      <Box p="2">
        <SegmentedControl.Root
          onValueChange={handleFormSelection}
          size="1"
          value={selectedForm}
        >
          <SegmentedControl.Item value={FormType.REDIRECT}>
            Redirect
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
      <Separator size={"4"} my="1" />
      <DashboardControls
        ruleCount={displayedRules?.length}
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
        {showRules &&
          rulesSortedByCreationTime()?.map((rule) => {
            return (
              <Box width={"100%"} p="1" className={styles.RuleCardContainer}>
                <InterpolationCard info={rule} />{" "}
              </Box>
            );
          })}
      </Flex>
    </ErrorBoundary>
  );
};

import { Flex, Card, Container } from "@radix-ui/themes";
import { Import } from "../Import/Import.tsx";
import { Exporter } from "../Exporter/Exporter.tsx";
import { DashboardNav } from "../DashboardNav/DashboardNav.tsx";
import { RedirectForm } from "../RedirectForm/RedirectForm.tsx";
import { HeaderForm } from "../HeaderForm/HeaderForm.tsx";
import { ScriptForm } from "../ScriptForm/ScriptForm.tsx";
import { DashboardControls } from "../DashboardControls/DashboardControls.tsx";
import { useInterpolations } from "../../hooks/useInterpolations/useInterpolations.ts";
import { useInterpolateFormSelection } from "../../hooks/useInterpolateFormSelection/useInterpolateFormSelection.ts";
import styles from "./ControlCenter.module.scss";
import { FormType } from "@/constants";
import { useInterpolationForm } from "../../hooks/useInterpolationForm/useInterpolationForm.ts";

export const ControlCenter = () => {
  const { interpolations, allPaused, pauseAll, removeAll, resumeAll } =
    useInterpolations();
  const { selectedForm, setSelectedForm } = useInterpolateFormSelection();
  const form = useInterpolationForm();
  return (
    <Container className={styles.ControlCenterContainer}>
      <Flex p="2" className={styles.ImportExportCTAs} justify="between">
        <Import />
        <Exporter
          interpolations={interpolations}
          disabled={!interpolations?.length}
        />
      </Flex>
      <Flex
        gap="2"
        direction={"column"}
        flexGrow={"1"}
        data-testid={"dashboard"}
        justify={"start"}
        p="3"
      >
        <DashboardNav value={selectedForm} onChange={setSelectedForm} />
        <Card variant="surface">
          <Flex height={"100%"} direction="column" flexGrow={"1"}>
            <form>
              {selectedForm === FormType.REDIRECT && (
                // @ts-expect-error TODO: fix types
                <RedirectForm form={form} />
              )}
              {selectedForm === FormType.HEADER && (
                //@ts-expect-error TODO: fix types
                <HeaderForm form={form} />
              )}
              {selectedForm === FormType.SCRIPT && (
                // @ts-expect-error TODO: fix types
                <ScriptForm form={form} />
              )}
            </form>
          </Flex>
        </Card>
        <DashboardControls
          ruleCount={interpolations?.length}
          allPaused={!!allPaused}
          onResumeAllRules={resumeAll}
          onPauseAllRules={pauseAll}
          onDeleteAllRules={removeAll}
        />
      </Flex>
    </Container>
  );
};

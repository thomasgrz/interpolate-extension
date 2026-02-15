import { Flex, Box } from "@radix-ui/themes";
import { Import } from "../Import/Import.tsx";
import { Exporter } from "../Exporter/Exporter.tsx";
import { DashboardNav } from "../DashboardNav/DashboardNav.tsx";
import { RedirectForm } from "../RedirectForm/RedirectForm.tsx";
import { HeaderForm } from "../HeaderForm/HeaderForm.tsx";
import { ScriptForm } from "../ScriptForm/ScriptForm.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import { useInterpolations } from "../../hooks/useInterpolations/useInterpolations.ts";
import { useInterpolateFormSelection } from "../../hooks/useInterpolateFormSelection/useInterpolateFormSelection.ts";
import styles from "./ControlCenter.module.scss";
import { FormType } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";

export const ControlCenter = () => {
  const { interpolations } = useInterpolations();
  const { selectedForm, setSelectedForm } = useInterpolateFormSelection();

  return (
    <Flex gap="1" direction="column" className={styles.ControlCenterContainer}>
      <Flex pb="0" p="2" className={styles.ImportExportCTAs} justify="between">
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
        p="2"
        pt="0"
        className={styles.FormContainer}
      >
        <Flex direction={"column"} width={"100%"}>
          <Box p="2">
            <DashboardNav value={selectedForm} onChange={setSelectedForm} />
          </Box>
          <ErrorBoundary fallbackRender={() => "oops"}>
            <Flex height={"100%"} direction="column" flexGrow={"1"}>
              {selectedForm === FormType.REDIRECT && <RedirectForm />}
              {selectedForm === FormType.HEADER && <HeaderForm />}
              {selectedForm === FormType.SCRIPT && <ScriptForm />}
            </Flex>
          </ErrorBoundary>
        </Flex>
        <GlobalInterpolationOptions />
      </Flex>
    </Flex>
  );
};

import { Flex, Box } from "@radix-ui/themes";
import { Import } from "../Import/Import.tsx";
import { Exporter } from "../Exporter/Exporter.tsx";
import { DashboardNav } from "../DashboardNav/DashboardNav.tsx";
import {
  RedirectForm,
  RedirectFormValue,
} from "../RedirectForm/RedirectForm.tsx";
import { HeaderForm, HeaderFormValue } from "../HeaderForm/HeaderForm.tsx";
import { ScriptForm, ScriptFormValue } from "../ScriptForm/ScriptForm.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import { useInterpolations } from "../../hooks/useInterpolations/useInterpolations.ts";
import { useInterpolateFormSelection } from "../../hooks/useInterpolateFormSelection/useInterpolateFormSelection.ts";
import styles from "./ControlCenter.module.scss";
import { FormType } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createScriptInterpolation } from "#src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";

export const ControlCenter = () => {
  const { interpolations } = useInterpolations();
  const { selectedForm, setSelectedForm } = useInterpolateFormSelection();
  const handleCreateRedirectInterpolation = async ({
    value,
  }: {
    value: RedirectFormValue;
  }) => {
    const { destination, name, matcher } = value;
    const isValid =
      typeof name === "string" &&
      typeof destination === "string" &&
      typeof matcher === "string";
    const isInvalid = !isValid;
    if (isInvalid) return;
    await InterpolateStorage.create(
      createRedirectInterpolation({
        source: matcher,
        name: name,
        destination: destination,
      }),
    );
  };
  const handleCreateHeaderInterpolation = async ({
    value,
  }: {
    value: HeaderFormValue;
  }) => {
    const { key, value: headerValue, name } = value;
    const isValid =
      typeof key === "string" &&
      typeof headerValue === "string" &&
      typeof name === "string";

    const isInvalid = !isValid;
    if (isInvalid) return;
    await InterpolateStorage.create(
      createHeaderInterpolation({ headerValue, headerKey: key, name }),
    );
  };
  const handleCreateScriptInterpolation = async ({
    value,
  }: {
    value: ScriptFormValue;
  }) => {
    const { script, runAt, matches, name } = value;
    const isValid =
      typeof script === "string" &&
      typeof runAt === "string" &&
      typeof matches === "string" &&
      typeof name === "string";
    const isInvalid = !isValid;

    if (isInvalid) return;

    await InterpolateStorage.create(
      createScriptInterpolation({ body: script, runAt, matches, name }),
    );
  };

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
          <Flex justify={"center"} p="2" width="stretch">
            <DashboardNav value={selectedForm} onChange={setSelectedForm} />
          </Flex>
          <ErrorBoundary fallbackRender={() => "oops"}>
            <Flex height={"100%"} direction="column" flexGrow={"1"}>
              {selectedForm === FormType.REDIRECT && (
                <RedirectForm onSubmit={handleCreateRedirectInterpolation} />
              )}
              {selectedForm === FormType.HEADER && (
                <HeaderForm onSubmit={handleCreateHeaderInterpolation} />
              )}
              {selectedForm === FormType.SCRIPT && (
                <ScriptForm onSubmit={handleCreateScriptInterpolation} />
              )}
            </Flex>
          </ErrorBoundary>
        </Flex>
        <GlobalInterpolationOptions />
      </Flex>
    </Flex>
  );
};

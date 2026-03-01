import { Flex } from "@radix-ui/themes";
import { ImportForm } from "../Import/Import.tsx";
import { Exporter } from "../Exporter/Exporter.tsx";
import {
  InterpolateOptionsModal,
  InterpolationOptionSelection,
} from "../InterpolateOptionsModal/InterpolateOptionsModal.tsx";
import {
  RedirectForm,
  RedirectFormValue,
} from "../RedirectForm/RedirectForm.tsx";
import { HeaderForm, HeaderFormValue } from "../HeaderForm/HeaderForm.tsx";
import { ScriptForm } from "../ScriptForm/ScriptForm.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import { useInterpolations } from "../../hooks/useInterpolations/useInterpolations.ts";
import { useInterpolateFormSelection } from "../../hooks/useInterpolateFormSelection/useInterpolateFormSelection.ts";
import styles from "./ControlCenter.module.scss";
import { FormType } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createScriptInterpolation } from "#src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";
import { ScriptFormValue } from "../ScriptForm/ScriptForm.types.ts";
import { useState } from "react";

export const ControlCenter = () => {
  const { interpolations } = useInterpolations();
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
    const { script, runAt, name } = value;
    const isValid =
      typeof script === "string" &&
      typeof runAt === "string" &&
      typeof name === "string";
    const isInvalid = !isValid;

    if (isInvalid) throw Error("form invalid");

    await InterpolateStorage.create(
      createScriptInterpolation({ body: script, runAt, name }),
    );
  };
  const handleInterpolationOptionOnChange = (
    type: InterpolationOptionSelection,
  ) => {};

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <Flex gap="1" direction="column" className={styles.ControlCenterContainer}>
      <Flex
        direction={"column"}
        flexGrow={"1"}
        data-testid={"dashboard"}
        justify={"start"}
        gap="3"
        p="3"
        className={styles.FormContainer}
      >
        <GlobalInterpolationOptions />
        <InterpolateOptionsModal
          onOpenChange={handleOpenChange}
          isOpen={isOpen}
          onChange={handleInterpolationOptionOnChange}
        />
      </Flex>
    </Flex>
  );
};

import { logger } from "@/utils/logger.ts";
import { dashboardFormOptions } from "@/contexts/dashboard-context.ts";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createRedirectInterpolation } from "@/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { SubmitAction } from "@/constants.ts";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";
import { useAppForm } from "../useForm/useForm";
import { useEffect, useRef } from "react";

export const useInterpolationForm = (defaultValues: unknown) => {
  const hasSynced = useRef<boolean>(null);

  useEffect(() => {
    if (hasSynced.current) return;
    hasSynced.current = true;

    void InterpolateStorage.syncAll().catch((e) => logger(e));
  }, []);

  const form = useAppForm({
    ...dashboardFormOptions,
    ...(defaultValues ? { defaultValues } : {}),
    validators: {},
    onSubmitMeta: {
      submitAction: null,
    },
    onSubmit: async ({ value, meta }) => {
      const { submitAction, id } = meta;
      logger(`Selected action - ${submitAction}`);
      if (submitAction === SubmitAction.AddRedirect) {
        debugger;
        await InterpolateStorage.create([
          createRedirectInterpolation({
            id: value.redirectRuleForm.id,
            source: value.redirectRuleForm.source,
            destination: value.redirectRuleForm.destination,
            name: value.redirectRuleForm.name || "Redirect Rule",
          }),
        ]);
        return;
      }
      if (submitAction === SubmitAction.AddHeader) {
        await InterpolateStorage.create([
          createHeaderInterpolation({
            id: value.headerRuleForm.id,
            headerKey: value.headerRuleForm.key,
            headerValue: value.headerRuleForm.value,
            name: value.headerRuleForm.name,
          }),
        ]);
        return;
      }
      if (submitAction === SubmitAction.CreateScript) {
        await InterpolateStorage.create([
          createScriptInterpolation({
            id,
            name: value.scriptForm.name,
            body: value.scriptForm.body,
            matches: value.scriptForm.matches,
          }),
        ]);
        return;
      }
    },
  });
  return form;
};

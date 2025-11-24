import { logger } from "@/utils/logger.ts";
import { dashboardFormOptions } from "@/contexts/dashboard-context.ts";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createRedirectInterpolation } from "@/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { SubmitAction } from "@/constants.ts";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";
import { useAppForm } from "../useForm/useForm";

export const useInterpolationForm = () => {
  const form = useAppForm({
    ...dashboardFormOptions,
    validators: {},
    onSubmitMeta: {
      submitAction: null,
    },
    onSubmit: async ({ value, meta }) => {
      logger(`Selected action - ${meta?.submitAction}`);
      if (meta.submitAction === SubmitAction.AddRedirect) {
        await InterpolateStorage.create([
          createRedirectInterpolation({
            source: value.redirectRuleForm.source,
            destination: value.redirectRuleForm.destination,
            name: value.redirectRuleForm.name || "Redirect Rule",
          }),
        ]);
        return;
      }
      if (meta.submitAction === SubmitAction.AddHeader) {
        await InterpolateStorage.create([
          createHeaderInterpolation({
            headerKey: value.headerRuleForm.key,
            headerValue: value.headerRuleForm.value,
            name: value.headerRuleForm.name,
          }),
        ]);
        return;
      }
      if (meta.submitAction === SubmitAction.CreateScript) {
        await InterpolateStorage.create([
          createScriptInterpolation({
            name: value.scriptForm.name,
            id: value.scriptForm.id,
            body: value.scriptForm.body,
            include: value.scriptForm.include,
          }),
        ]);
        return;
      }
    },
  });
  return form;
};

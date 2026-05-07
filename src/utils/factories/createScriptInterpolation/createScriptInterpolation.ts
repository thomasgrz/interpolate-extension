import { ScriptInterpolation } from "@/utils/factories/Interpolation";
import { generateRuleId } from "@/utils/id/generateRedirectRuleId";

export const createScriptInterpolation = (scriptForm: {
  id?: string | null;
  script: string;
  runAt?: "document_start" | "document_idle" | "document_end";
  matches?: string;
  name: string;
}) => {
  return new ScriptInterpolation({
    name: scriptForm.name,
    details: {
      js: [{ code: `${scriptForm.script}` }],
      id: scriptForm?.id ?? generateRuleId().toString(),
      matches: [scriptForm.matches || "*://*/*"],
      runAt: scriptForm?.runAt ?? "document_start",
    },
  });
};

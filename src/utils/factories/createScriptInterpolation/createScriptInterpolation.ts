import { ScriptInterpolation } from "@/utils/factories/Interpolation";
import { generateRuleId } from "@/utils/id/generateRedirectRuleId";

export const createScriptInterpolation = (scriptForm: {
  body: string;
  runAt?: string;
  matches: string;
  name: string;
}) => {
  return new ScriptInterpolation({
    name: scriptForm.name,

    details: {
      js: [{ code: `${scriptForm.body}` }],
      id: generateRuleId().toString(),
      matches: [scriptForm.matches || "*://*/*"],
    },
  });
};

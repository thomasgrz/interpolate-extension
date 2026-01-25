import { ScriptInterpolation } from "/src/utils/factories/Interpolation.ts.js";
import { generateRuleId } from "/src/utils/id/generateRedirectRuleId.ts.js";
export const createScriptInterpolation = (scriptForm) => {
  return new ScriptInterpolation({
    name: scriptForm.name,
    details: {
      js: [{ code: `${scriptForm.body}` }],
      id: generateRuleId().toString(),
      matches: [scriptForm.matches || "*://*/*"]
    }
  });
};

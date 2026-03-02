import { RedirectInterpolation } from "@/utils/factories/Interpolation";
import { generateRuleId } from "../../id/generateRedirectRuleId";

export const createRedirectInterpolation = (rule: {
  source: string;
  destination: string;
  name: string;
  id?: number | null;
}) => {
  return new RedirectInterpolation({
    name: rule.name,
    details: {
      destination: rule.destination,
      regexFilter: rule.source,
      id: rule?.id ?? generateRuleId(),
    },
  });
};

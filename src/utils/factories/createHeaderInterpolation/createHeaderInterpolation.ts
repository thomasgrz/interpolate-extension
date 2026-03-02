import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { generateRuleId } from "../../id/generateRedirectRuleId";

export const createHeaderInterpolation = (rule: {
  headerKey: string;
  headerValue: string;
  name: string;
  id?: number | null;
}) => {
  return new HeaderInterpolation({
    name: rule.name,
    details: {
      headerKey: rule.headerKey,
      headerValue: rule.headerValue,
      id: rule?.id ?? generateRuleId(),
    },
  });
};

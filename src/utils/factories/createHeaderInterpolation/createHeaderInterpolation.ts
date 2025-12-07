import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { generateRuleId } from "../../id/generateRedirectRuleId";

export const createHeaderInterpolation = (rule: {
  headerKey: string;
  headerValue: string;
  name: string;
  id?: number;
}) => {
  return new HeaderInterpolation({
    name: rule.name,
    details: {
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          {
            header: rule.headerKey,
            operation: "set",
            value: rule.headerValue,
          },
        ],
      },
      condition: {
        resourceTypes: [
          "sub_frame",
          "font",
          "main_frame",
          "xmlhttprequest",
          "script",
          "image",
          "webbundle",
          "media",
          "other",
          "object",
        ],
        regexFilter: ".*",
      },
      id: rule?.id ?? generateRuleId(),
    },
  });
};

import { generateRuleId } from "#src/utils/id/generateRedirectRuleId.ts";
import { TabManagerInterpolation } from "../Interpolation";

export const createTabManagermentInterpolation = (tabForm: {
  groupId: string;
  groupName: string;
  name: string;
  matcher: string;
  id?: string;
  createdAt?: number;
}) => {
  return new TabManagerInterpolation({
    details: {
      matcher: tabForm.matcher,
      groupId: tabForm.groupId,
      groupName: tabForm.groupName,
      id: tabForm.id ?? String(generateRuleId()),
    },
    type: "tab-manager",
    isActive: true,
    name: tabForm.name,
    createdAt: tabForm?.createdAt ?? new Date().getTime(),
  });
};

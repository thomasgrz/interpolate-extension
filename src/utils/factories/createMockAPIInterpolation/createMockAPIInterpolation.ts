import { MockResponseFormValue } from "#src/components/MockResponseForm/MockResponseForm.tsx";
import { MockAPIInterpolation } from "../Interpolation";

export const createMockAPIInterpolation = (
  interp: MockResponseFormValue & { name: string },
) => {
  const { id, name } = interp;
  return new MockAPIInterpolation({
    name,
    details: { ...interp, id: (id as string) ?? crypto.randomUUID() },
  });
};

import preview from "#.storybook/preview";

import { NotifierToast } from "./NotifierToast";
import { createHeaderInterpolation } from "../../utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";

const meta = preview.meta({
  component: NotifierToast,
  // @ts-expect-error CSF next issue?
  render: (args) => (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
      }}
    >
      <NotifierToast {...args}>
        <InterpolationCard
          info={createHeaderInterpolation({
            name: "example notification for interpolation",
            headerKey: "test",
            headerValue: "value",
          })}
        />
      </NotifierToast>
    </div>
  ),
});

export const Example = meta.story({
  // @ts-expect-error CSF next issue?
  args: {
    onOpenChange: () => {},
    open: true,
  },
});

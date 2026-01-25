import preview from "#.storybook/preview";

import { NotifierToast } from "./NotifierToast";
import { createHeaderInterpolation } from "../../utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";

const meta = preview.meta({
  component: NotifierToast,
});

export default meta;

export const Example = meta.story({
  args: {
    children: (
      <InterpolationCard
        info={createHeaderInterpolation({
          name: "example notification for interpolation",
        })}
      />
    ),
  },
});

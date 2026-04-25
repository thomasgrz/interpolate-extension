import preview from "#.storybook/preview";
import { useState } from "react";

import { CreateInterpolationsView } from "./CreateInterpolationsView.tsx";

const meta = preview.meta({
  component: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      // @ts-expect-error TODO: fix types
      <CreateInterpolationsView
        {...props}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
    );
  },
});

export default meta;

export const Example = meta.story();

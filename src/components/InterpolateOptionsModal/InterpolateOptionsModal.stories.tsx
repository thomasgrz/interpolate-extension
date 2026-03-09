import preview from "#.storybook/preview";
import { useState } from "react";

import { InterpolateOptionsModal } from "./InterpolateOptionsModal.tsx";

const meta = preview.meta({
  component: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <InterpolateOptionsModal
        {...props}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
    );
  },
});

export default meta;

export const Example = meta.story();

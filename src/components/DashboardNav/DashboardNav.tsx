import { SegmentedControl, Strong } from "@radix-ui/themes";

import { FormType } from "@/constants";

// @ts-expect-error TODO: fix types
export const DashboardNav = ({ value, onChange }) => {
  return (
    <SegmentedControl.Root
      variant="surface"
      radius="full"
      onValueChange={onChange}
      size="2"
      value={value}
    >
      <SegmentedControl.Item
        style={{ cursor: "pointer" }}
        value={FormType.REDIRECT}
      >
        <Strong>Redirect</Strong>
      </SegmentedControl.Item>
      <SegmentedControl.Item
        style={{ cursor: "pointer" }}
        value={FormType.HEADER}
      >
        <Strong>Header</Strong>
      </SegmentedControl.Item>
      <SegmentedControl.Item
        style={{ cursor: "pointer" }}
        value={FormType.SCRIPT}
      >
        <Strong data-testid="script-form-option">Script</Strong>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};

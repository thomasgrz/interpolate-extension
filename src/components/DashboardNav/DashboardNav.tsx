import {
  Flex,
  Button,
  DropdownMenu,
  IconButton,
  SegmentedControl,
  Strong,
} from "@radix-ui/themes";
import { Popover } from "radix-ui";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useInterpolationForm } from "@/hooks/useInterpolationForm/useInterpolationForm";

import { FormType } from "@/constants";
import { RedirectForm } from "../RedirectForm/RedirectForm";

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
        <Strong>Script</Strong>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};

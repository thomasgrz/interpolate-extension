import { Flex, Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import { Popover } from "radix-ui";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useInterpolationForm } from "@/hooks/useInterpolationForm/useInterpolationForm";

import { RedirectForm } from "../RedirectForm/RedirectForm";

export const CreateInterpolationButton = ({ children }) => {
  const form = useInterpolationForm();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button direction="row" radius="full">
          Create interpolation <PlusCircledIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <RedirectForm form={form} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

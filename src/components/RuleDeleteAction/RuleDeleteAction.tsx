import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Heading, Text } from "@radix-ui/themes";

export const RuleDeleteAction = ({
  onDelete,
  title = "Delete this rule forever?",
  info = "You can also just pause this rule",
  open,
  hideTrigger,
  onCancel,
}: {
  onCancel?: () => void;
  onDelete: () => void;
  onOpenChange?: (value: boolean) => void;
  open?: boolean;
  title?: string;
  info?: string;
  hideTrigger?: boolean;
}) => {
  return (
    <AlertDialog.Root open={open}>
      {hideTrigger ? null : (
        <AlertDialog.Trigger>
          <Button variant="outline" color="red">
            <TrashIcon /> Delete
          </Button>
        </AlertDialog.Trigger>
      )}
      <AlertDialog.Content>
        <AlertDialog.Title>
          <Heading size="3">{title}</Heading>
        </AlertDialog.Title>
        <AlertDialog.Description>
          <Text size="1">{info}</Text>
        </AlertDialog.Description>
        <Flex p="3" justify={"between"}>
          <AlertDialog.Cancel onClick={onCancel}>
            <Button radius="small" variant="soft" color="gray">
              Exit
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onDelete} radius="small" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

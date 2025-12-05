import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";

export const RuleDeleteAction = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton variant="outline" color="red">
          <TrashIcon />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete this rule forever?</AlertDialog.Title>
        <AlertDialog.Description>
          You can also just pause this rule.
        </AlertDialog.Description>
        <Flex p="3" justify={"between"}>
          <AlertDialog.Cancel>
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

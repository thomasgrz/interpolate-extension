import preview from "#.storybook/preview";
import { Button } from "@radix-ui/themes";
import "./ToastNotification.module.scss";
import { useToastCreationContext } from "#src/hooks/useToastCreationContext/useToastCreationContext.ts";
import { ToastNotificationsContainer } from "./ToastNotificationsContainer.component";

const meta = preview.meta({
  component: () => {
    const createToast = useToastCreationContext();
    return (
      <Button onClick={() => createToast({ description: " test" })}>
        Create toast
      </Button>
    );
  },
  decorators: [
    // @ts-expect-error idk
    (Story) => {
      return (
        <ToastNotificationsContainer>
          <Story />
        </ToastNotificationsContainer>
      );
    },
  ],
});

export default meta;

export const Default = meta.story({ args: {} });

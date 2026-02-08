import preview from "#.storybook/preview";
import { Button } from "@radix-ui/themes";
import {
  ToastNotification,
  ToastNotificationsContainer,
  useToastCreationContext,
} from "./ToastNotification.tsx";
import "./ToastNotification.module.scss";

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

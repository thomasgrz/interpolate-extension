import preview from "#.storybook/preview";
import { Button, Flex } from "@radix-ui/themes";
import "./ToastNotification.module.scss";
import { useToastCreationContext } from "#src/hooks/useToastCreationContext/useToastCreationContext.ts";
import { ToastNotificationsContainer } from "./ToastNotificationsContainer.component";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createScriptInterpolation } from "#src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";

const meta = preview.meta({
  component: () => {
    const createToast = useToastCreationContext();
    return (
      <Flex gap="1">
        {[
          createRedirectInterpolation({
            name: "Test",
            destination: "destination",
            source: "source",
          }),
          createHeaderInterpolation({
            name: "Test",
            headerKey: "hearder key",
            headerValue: "header value",
          }),
          createScriptInterpolation({
            body: "script body",
            name: "script test",
            runAt: "idk",
          }),
        ].map((interp: AnyInterpolation) => {
          return (
            <Button
              onClick={() =>
                createToast({
                  content: <InterpolationCard info={interp} />,
                })
              }
            >
              {interp?.type}
            </Button>
          );
        })}
      </Flex>
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

export const Default = meta.story();

import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import styles from "./Notifier.module.scss";
import { Flex } from "@radix-ui/themes";
import { useToastCreationContext } from "#src/hooks/useToastCreationContext/useToastCreationContext.ts";
import { InterpolateProvider } from "#src/contexts/interpolate-context.tsx";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { GlobalInterpolationOptions } from "#src/components/GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import { useEffect, useRef } from "react";

export const Notifier = () => {
  const createToast = useToastCreationContext();
  const isInitialized = useRef<boolean>(null);

  useEffect(() => {
    if (isInitialized.current) return;

    // @ts-expect-error testing
    window.__INTERPOLATE_NOTIFICATION_CACHE__ = new Set();

    isInitialized.current = true;

    chrome.runtime.onMessage.addListener((message) => {
      const isIrrelevantMessage = !message.interpolations;

      if (isIrrelevantMessage) return;
      // In background.ts we send a message
      // to the content script whenever an interpolation is used
      // (this happens on a tab by tab basis)
      const isNonInterpolationEvent = !message?.interpolations;
      if (isNonInterpolationEvent) return;
      const { interpolations } = message;

      interpolations.forEach((interp: AnyInterpolation) => {
        if (
          // @ts-expect-error testing
          window.__INTERPOLATE_NOTIFICATION_CACHE__.has(interp?.details?.id)
        )
          return;
        // @ts-expect-error testing
        window.__INTERPOLATE_NOTIFICATION_CACHE__.add(interp?.details?.id);
        return createToast({
          content: <InterpolationCard hideOptions info={interp} />,
          onOpenChange: (value: boolean) => {
            const open = !!value;
            if (open) return;

            // @ts-expect-error testing
            window.__INTERPOLATE_NOTIFICATION_CACHE__.remove(
              interp?.details?.id,
            );
          },
        });
      });
    });
  }, []);

  return (
    <InterpolateProvider>
      <Flex
        align="center"
        className={styles.GlobalInterpolationOptionsContainer}
      >
        <GlobalInterpolationOptions allowDelete={false} />
      </Flex>
    </InterpolateProvider>
  );
};

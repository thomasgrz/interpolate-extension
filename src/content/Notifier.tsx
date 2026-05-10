import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import styles from "./Notifier.module.scss";
import { Card, Flex, Strong, Text } from "@radix-ui/themes";
import { useToastCreationContext } from "#src/hooks/useToastCreationContext/useToastCreationContext.ts";
import { InterpolateProvider } from "#src/contexts/interpolate-context.tsx";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { GlobalInterpolationOptions } from "#src/components/GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import { useEffect, useRef, useState } from "react";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

export const Notifier = () => {
  const createToast = useToastCreationContext();
  const isInitialized = useRef<boolean>(null);
  const [isBrowserUIEnabled, setIsBrowserUIEnabled] = useState(true);

  useEffect(() => {
    chrome.storage?.local?.onChanged?.addListener((changes) => {
      if (changes?.[InterpolateStorage.BROWSER_UI_TOGGLE_KEY]) {
        const value =
          changes?.[InterpolateStorage.BROWSER_UI_TOGGLE_KEY]?.newValue;
        setIsBrowserUIEnabled(value);
      }
    });
  }, []);
  useEffect(() => {
    if (isInitialized.current) return;

    chrome?.storage?.local
      .get(InterpolateStorage.BROWSER_UI_TOGGLE_KEY)
      .then((value) => {
        setIsBrowserUIEnabled(
          value?.[InterpolateStorage.BROWSER_UI_TOGGLE_KEY],
        );
      });

    // @ts-expect-error testing
    window.__INTERPOLATE_NOTIFICATION_CACHE__ = new Set();

    isInitialized.current = true;

    chrome.runtime?.onMessage?.addListener?.((message) => {
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
          duration: 10000,
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

  return isBrowserUIEnabled ? (
    <InterpolateProvider>
      <Card
        data-radius="full"
        variant="surface"
        className={styles.GlobalInterpolationOptionsContainer}
        m="3"
      >
        <Flex gap="2" align="center" justify="center">
          <Text size="2">
            <Strong>interpolate</Strong>
          </Text>
          <GlobalInterpolationOptions />
        </Flex>
      </Card>
    </InterpolateProvider>
  ) : null;
};

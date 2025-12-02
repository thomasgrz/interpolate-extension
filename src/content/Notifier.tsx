import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import { useInterpolations } from "@/hooks/useInterpolations/useInterpolations";
import { Toast } from "radix-ui";
import styles from "./Notifier.module.scss";
import { useEffect, useState } from "react";
import { Flex, Theme } from "@radix-ui/themes";

export const Notifier = () => {
  const { recentlyUsed } = useInterpolations();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (recentlyUsed[0]) {
      setOpen(true);
    }
  }, [recentlyUsed]);

  return (
    <Theme
      style={{
        minHeight: 0,
        backgroundColor: "transparent",
      }}
    >
      <Flex>
        <Toast.Provider>
          <Toast.Root
            duration={3000}
            className={styles.ToastRoot}
            open={open}
            onOpenChange={() => setOpen((bool) => !bool)}
          >
            <Toast.Description className={styles.ToastDescription}>
              <InterpolationCard info={recentlyUsed[0]} />
            </Toast.Description>
          </Toast.Root>
          <Toast.Viewport className={styles.ToastViewport} />
        </Toast.Provider>
      </Flex>
    </Theme>
  );
};

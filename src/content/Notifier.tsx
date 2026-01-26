import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import { useInterpolations } from "@/hooks/useInterpolations/useInterpolations";
import styles from "./Notifier.module.scss";
import { Flex, Theme } from "@radix-ui/themes";
import { NotifierToast } from "../components/NotifierToast/NotifierToast.tsx";

export const Notifier = () => {
  const { recentlyUsed } = useInterpolations();

  return (
    <Theme
      style={{
        minHeight: 0,
        backgroundColor: "transparent",
      }}
    >
      <Flex direction="column" className={styles.Root}>
        {recentlyUsed.map((interp) => (
          <NotifierToast
            onOpenChange={interp?.onOpenChange}
            open={!interp?.hidden}
            title={interp?.url}
          >
            <InterpolationCard info={interp} />
          </NotifierToast>
        ))}
      </Flex>
    </Theme>
  );
};

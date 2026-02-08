import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import styles from "./Notifier.module.scss";
import { Flex } from "@radix-ui/themes";
import { useToastCreationContext } from "#src/hooks/useToastCreationContext/useToastCreationContext.ts";
import { InterpolateProvider } from "#src/contexts/interpolate-context.tsx";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const Notifier = () => {
  const createToast = useToastCreationContext();
  const handleInterpolationNotifications = (interps: AnyInterpolation[]) => {
    interps?.forEach((interp) =>
      createToast({
        title: interp.name,
        content: <InterpolationCard info={interp} />,
      }),
    );
  };

  return (
    <Flex direction="column" className={styles.Root}>
      <InterpolateProvider
        handleInterpolationNotifications={handleInterpolationNotifications}
      />
    </Flex>
  );
};

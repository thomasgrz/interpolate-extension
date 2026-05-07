import { ScrollArea, Box } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./InterpolationsListView.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const InterpolationsListView = ({
  configs,
  hideRuleToggle,
}: {
  hideRuleToggle?: boolean;
  configs?: AnyInterpolation[];
}) => {
  return (
    <ScrollArea className={styles.InterpolationsContainer}>
      {configs?.map?.((interpolation) => (
        <Box
          key={interpolation.details?.id}
          p="1"
          className={styles.InterpolationsCardContainer}
        >
          <InterpolationCard
            key={interpolation?.details?.id}
            hideRuleToggle={hideRuleToggle}
            info={interpolation}
          />
        </Box>
      ))}
    </ScrollArea>
  );
};

import { Flex, Box } from "@radix-ui/themes";
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
    <Flex direction="column">
      {configs?.map?.((interpolation) => (
        <Box
          key={interpolation.details?.id}
          p="1"
          className={styles.InterpolationsCardContainer}
        >
          <InterpolationCard
            hideRuleToggle={hideRuleToggle}
            info={interpolation}
          />
        </Box>
      ))}
    </Flex>
  );
};

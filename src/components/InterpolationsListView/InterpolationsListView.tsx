import { Flex, Box } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./InterpolationsListView.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const InterpolationsListView = ({
  configs,
  groups,
  hideRuleToggle,
}: {
  groups?: [string, string[]];
  hideRuleToggle?: boolean;
  configs?: AnyInterpolation[];
}) => {
  console.log({ groups });
  return (
    <Flex className={styles.InterpolationsContainer}>
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

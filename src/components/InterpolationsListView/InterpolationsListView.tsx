import { Flex, Box } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./InterpolationsListView.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const InterpolationsListView = ({
  configs,
}: {
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
          <InterpolationCard info={interpolation} />
        </Box>
      ))}
    </Flex>
  );
};

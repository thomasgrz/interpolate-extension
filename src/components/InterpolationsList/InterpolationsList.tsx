import { useInterpolations } from "../../hooks/useInterpolations/useInterpolations.ts";
import { Flex, Box } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./InterpolationsList.module.scss";

export const InterpolationsList = () => {
  const { interpolations } = useInterpolations();
  return (
    <Flex width="100%" p="1" direction={"row"} wrap="wrap">
      {interpolations.map((interpolation) => (
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

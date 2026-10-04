import { ScrollArea, Box, Flex } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./InterpolationsListView.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const InterpolationsListView = ({
  configs,
  onInterpolationCheckboxChange,
  hideDeleteButton,
  hideRuleToggle,
  showCheckboxes,
}: {
  hideRuleToggle?: boolean;
  hideDeleteButton?: boolean;
  configs?: AnyInterpolation[];
  showCheckboxes?: boolean;
  onInterpolationCheckboxChange?: (arg: {
    checked: boolean;
    interpolation: AnyInterpolation;
  }) => void;
}) => {
  return (
    <ScrollArea className={styles.InterpolationsContainer}>
      <Flex direction={"row"} width="100%" maxWidth="100%" pt="3" wrap="wrap">
        {configs?.map?.((interpolation) => (
          <Box
            key={interpolation.details?.id}
            p="1"
            className={styles.InterpolationsCardContainer}
          >
            <InterpolationCard
              enableCheckbox={showCheckboxes}
              key={interpolation?.details?.id}
              hideDeleteButton={hideDeleteButton}
              hideRuleToggle={hideRuleToggle}
              info={interpolation}
              onCheckboxSelected={onInterpolationCheckboxChange}
            />
          </Box>
        ))}
      </Flex>
    </ScrollArea>
  );
};

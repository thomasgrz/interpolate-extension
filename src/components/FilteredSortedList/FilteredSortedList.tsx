import { Flex, Text } from "@radix-ui/themes";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const FilteredSortedList = ({ filter }: { filter?: string }) => {
  const { interpolations, sortedInterpolations } = useInterpolationsContext();
  return (
    <Flex direction="column" gap="2">
      <Text size="1">
        {`showing ${sortedInterpolations?.length} interpolation${sortedInterpolations?.length === 1 ? "" : "s"} match${sortedInterpolations?.length === 1 ? "" : "es"} for "${filter}"`}
      </Text>
      {interpolations?.length ? (
        <InterpolationsListView
          configs={sortedInterpolations as AnyInterpolation[]}
        />
      ) : (
        <Text size="1">No matching interpolations or groups </Text>
      )}
    </Flex>
  );
};

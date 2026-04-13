import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { Box, Card, Flex, Heading, Switch, Separator } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";

export const InterpolationGroup = ({
  interpolations,
  name,
}: {
  interpolations: AnyInterpolation[];
  name: string;
  groupId: string;
}) => {
  return (
    <Card variant="ghost">
      <Flex justify={"between"} align={"center"}>
        <Heading size="3" as="h6">
          {name}
        </Heading>
        <Switch radius="full" />
      </Flex>
      <Flex p="2" gap="1" direction="column">
        {interpolations?.map?.((interp) => (
          <InterpolationCard noShadow info={interp} />
        ))}
      </Flex>
    </Card>
  );
};

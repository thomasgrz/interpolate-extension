import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { Card, Flex, Heading, Switch } from "@radix-ui/themes";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";
import styles from "./InterpolationGroup.module.scss";

export const InterpolationGroup = ({
  interpolations,
  name,
}: {
  interpolations: AnyInterpolation[];
  name: string;
  groupId: string;
}) => {
  return (
    <Card className={styles.Card} variant="ghost">
      <Flex justify={"between"} align={"center"}>
        <Heading size="3" as="h6">
          {name}
        </Heading>
        <Switch radius="full" />
      </Flex>
      <Flex p="2" gap="1" direction="column">
        {interpolations?.map?.((interp) => (
          <InterpolationCard info={interp} />
        ))}
      </Flex>
    </Card>
  );
};

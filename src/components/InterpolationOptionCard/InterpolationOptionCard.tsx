import { Card, Flex, Heading, IconProps, Text } from "@radix-ui/themes";
import styles from "./InterpolationOptionCard.module.scss";

export const InterpolationOptionCard = ({
  color,
  heading,
  subHeading,
  onClick,
  icon: Icon,
}: {
  color: string;
  heading: string;
  subHeading?: string;
  onClick: () => void;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}) => (
  <Card
    onClick={onClick}
    className={styles.Card}
    // @ts-expect-error TODO: fix me
    style={{ "--card-background": color }}
    asChild
    variant="classic"
  >
    <Flex direction="column">
      <Heading align={"center"} as="h6" size="2">
        {heading}
      </Heading>
      {subHeading && <Text size="1">{subHeading}</Text>}
      {Icon && (
        <Icon
          height="1.5rem"
          width="1.5rem"
          data-ui="interpolation-option-icon"
        />
      )}
    </Flex>
  </Card>
);

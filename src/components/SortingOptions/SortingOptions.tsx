import { Flex, Select, Text } from "@radix-ui/themes";

export enum SortOption {
  A_TO_Z = "atoz",
  Z_TO_A = "ztoa",
  OLDEST = "oldest",
  NEWEST = "newest",
  GROUP_A_TO_Z = "groupAtoZ",
  GROUP_Z_TO_A = "groupZtoA",
}

export interface SortingOptionsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortingOptions = ({ onChange, value }: SortingOptionsProps) => {
  const options = {
    [SortOption.A_TO_Z]: "A to Z",
    [SortOption.Z_TO_A]: "Z to A",
    [SortOption.NEWEST]: "Newest first",
    [SortOption.OLDEST]: "Oldest first",
    [SortOption.GROUP_A_TO_Z]: "By Group -> A to Z",
    [SortOption.GROUP_Z_TO_A]: "By Group -> Z to A",
  };
  return (
    <Flex maxWidth="160px">
      <Select.Root
        onValueChange={onChange}
        size="1"
        defaultValue={value}
        value={value}
      >
        <Select.Trigger variant="surface">
          <Flex as="span" align="center" gap="2">
            <Text>{options[value]}</Text>
          </Flex>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value={SortOption.NEWEST}>
              <Text size="1">{options[SortOption.NEWEST]}</Text>
            </Select.Item>
            <Select.Item value={SortOption.OLDEST}>
              <Text size="1">{options[SortOption.OLDEST]}</Text>
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Item value={SortOption.A_TO_Z}>
              <Text size="1">{options[SortOption.A_TO_Z]}</Text>
            </Select.Item>
            <Select.Item value={SortOption.Z_TO_A}>
              <Text size="1">{options[SortOption.Z_TO_A]}</Text>
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Item value={SortOption.GROUP_A_TO_Z}>
              <Text size="1">{options[SortOption.GROUP_A_TO_Z]}</Text>
            </Select.Item>
            <Select.Item value={SortOption.GROUP_Z_TO_A}>
              <Text size="1">{options[SortOption.GROUP_Z_TO_A]}</Text>
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

import { Box, Flex, Select, Strong, Text } from "@radix-ui/themes";
import styles from "./SelectField.module.scss";
import { Label } from "radix-ui";

export default function SelectField({
  label,
  options,
  errors,
  onBlur,
  onChange,
  value,
}: {
  errors?: (string | null | undefined)[];
  label: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  value?: string;
}) {
  return (
    <Flex align={"start"} direction="column" minWidth={"100%"}>
      <Box p="1">
        <Label.Root>
          <Text size="2">
            <Strong>{label}</Strong>
          </Text>
        </Label.Root>
      </Box>
      <Box className={styles.Button}>
        <Select.Root
          onValueChange={onChange}
          size="2"
          defaultValue="document_start"
          value={value}
        >
          <Select.Trigger></Select.Trigger>
          <Select.Content onBlur={onBlur}>
            {options.map(({ label, value }) => (
              <Select.Item value={value}>{label}</Select.Item>
            ))}
          </Select.Content>
          {errors && (
            <ul>
              {errors?.map?.((error) => (
                <li>{error}</li>
              ))}
            </ul>
          )}
        </Select.Root>
      </Box>
    </Flex>
  );
}

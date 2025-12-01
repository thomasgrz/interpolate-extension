import { useFieldContext } from "@/contexts/form-context";
import { Box, Flex, Select } from "@radix-ui/themes";
import { useStore } from "@tanstack/react-form";
import styles from "./SelectField.module.scss";
import InputLabel from "../InputLabel/InputLabel";

export default function SelectField({
  label,
  options,
}: {
  label: string;
  options: { label: string; value: string }[];
}) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Flex align={"start"} direction="column" minWidth={"100%"}>
      <Box p="1">
        <InputLabel>{label}</InputLabel>
      </Box>
      <Box className={styles.Button}>
        <Select.Root size="2" defaultValue="document_start">
          <Select.Trigger></Select.Trigger>
          <Select.Content>
            {options.map(({ label, value }) => (
              <Select.Item value={value}>{label}</Select.Item>
            ))}
          </Select.Content>
          {errors && (
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          )}
        </Select.Root>
      </Box>
    </Flex>
  );
}

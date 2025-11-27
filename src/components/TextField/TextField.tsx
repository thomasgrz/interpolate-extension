import { Box, Flex, TextField, Text } from "@radix-ui/themes";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../contexts/form-context";
import InputLabel from "../InputLabel/InputLabel";

export default function TextInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  return (
    <Box flexGrow={"1"}>
      <Flex align="start">
        <InputLabel>{label}</InputLabel>
      </Flex>
      <Box flexGrow={"1"}>
        <TextField.Root
          placeholder={placeholder}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
        {errors.map((error: string) => (
          <Flex>
            <Text align={"left"} key={error} size={"1"} color="red">
              {error}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

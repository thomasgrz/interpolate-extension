import { Box, Flex, Text, TextArea as _TextArea } from "@radix-ui/themes";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../contexts/form-context";
import InputLabel from "../InputLabel/InputLabel";

export default function TextArea({
  placeholder,
  htmlFor,
  label,
}: {
  label: string;
  htmlFor: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  return (
    <Box flexGrow={"1"}>
      <Flex gap={"1"} align="start" direction={"column"}>
        <InputLabel>{label}</InputLabel>
        <Box width={"100%"}>
          <_TextArea
            radius={"large"}
            id={htmlFor}
            placeholder={placeholder}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        </Box>
        {errors.map((error: string) => (
          <Text align={"left"} size="1" key={error} color="red">
            {error}
          </Text>
        ))}
      </Flex>
    </Box>
  );
}

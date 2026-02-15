import { Box, Flex, Text, TextAreaProps, TextArea } from "@radix-ui/themes";
import InputLabel from "../InputLabel/InputLabel";

export default function TextAreaInput({
  label,
  errors,
  ...props
}: {
  errors: string[];
  label: string;
} & TextAreaProps) {
  return (
    <Box flexGrow={"1"}>
      <Flex gap={"1"} align="start" direction={"column"}>
        <InputLabel>{label}</InputLabel>
        <Box width={"100%"}>
          <TextArea radius={"large"} {...props} />
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

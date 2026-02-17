import {
  Box,
  Flex,
  Text,
  TextAreaProps,
  TextArea,
  Strong,
} from "@radix-ui/themes";
import { Label } from "radix-ui";

export default function TextAreaInput({
  label,
  errors,
  ...props
}: {
  errors: (string | undefined | null)[];
  label: string;
} & TextAreaProps) {
  return (
    <Box flexGrow={"1"}>
      <Flex gap={"1"} align="start" direction={"column"}>
        <Label.Root>
          <Text size="2">
            <Strong>{label}</Strong>
          </Text>
        </Label.Root>
        <Box width={"100%"}>
          <TextArea radius={"large"} {...props} />
        </Box>
        {errors?.map?.((error?: string | null) => (
          <Text align={"left"} size="1" key={error} color="red">
            {error}
          </Text>
        ))}
      </Flex>
    </Box>
  );
}

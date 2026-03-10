import { Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { Label } from "radix-ui";

export const TextInput = ({
  label,
  errors,
  helperText,
  id,
  ...props
}: TextField.RootProps & {
  helperText?: string;
  errors?: (string | undefined | null)[];
  label?: string | React.ReactNode;
}) => {
  return (
    <Flex p="1" direction={"column"}>
      <Label.Root htmlFor={id}>
        <Strong>
          {typeof label === "string" ? <Text size="2">{label}</Text> : label}
        </Strong>
      </Label.Root>
      <TextField.Root {...props} id={id} value={props.value} />
      {errors?.map?.((error?: string | null) => (
        <Text align={"left"} size="1" key={error} color="red">
          {error}
        </Text>
      ))}
      {helperText && (
        <Text size="1">
          <em>{helperText}</em>
        </Text>
      )}
    </Flex>
  );
};

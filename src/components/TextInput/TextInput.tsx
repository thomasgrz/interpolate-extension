import { Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { ReactNode } from "react";

export const TextInput = ({
  label,
  errors,
  helperText,
  icon,
  id,
  ...props
}: TextField.RootProps & {
  helperText?: string;
  errors?: (string | undefined | null)[];
  icon?: ReactNode;
  label?: string | React.ReactNode;
}) => {
  return (
    <Flex width="stretch" p="1" direction={"column"}>
      <Label.Root htmlFor={id}>
        <Strong>
          {typeof label === "string" ? <Text size="2">{label}</Text> : label}
        </Strong>
      </Label.Root>
      <TextField.Root {...props} id={id} value={props.value}>
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
      </TextField.Root>
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

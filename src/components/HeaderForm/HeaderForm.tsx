import { Box, Button, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";

export const HeaderForm = ({
  defaultValues,
  onSuccess,
}: {
  defaultValues?: {
    name: string;
    key: string;
    value: string;
  };
  onSuccess?: () => void;
}) => {
  const form = useForm({
    defaultValues,
    onSubmit: onSuccess,
  });
  const validators = {
    onChange: ({ value }: { value?: unknown }) =>
      typeof value !== "string" || value?.trim()?.length
        ? undefined
        : "Please enter a valid input.",
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Box p="2">
        <Flex gap="1" direction={"column"}>
          <form.Field
            validators={validators}
            name="name"
            children={(field) => (
              <TextInput
                label="Name:"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Field
            validators={validators}
            name="key"
            children={(field) => (
              <TextInput
                label="Key:"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Field
            validators={validators}
            name="value"
            children={(field) => (
              <TextInput
                label="Value:"
                name={field.name}
                onChange={(e) => field.handleCh(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Subscribe>
            <Button>Create Header Interpolation</Button>
          </form.Subscribe>
        </Flex>
      </Box>
    </form>
  );
};

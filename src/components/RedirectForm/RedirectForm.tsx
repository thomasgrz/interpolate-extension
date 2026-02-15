import { Button, Card, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import styles from "./RedirectRuleForm.module.scss";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { FormErrors } from "#src/constants.ts";

const validateStringLength = ({
  value,
  min = 1,
  error,
}: {
  value?: string;
  min?: number;
  error: string;
}) => {
  return !value || value?.length < min ? error : null;
};

const RedirectFormErrors = {
  MISSING_NAME: FormErrors.MISSING_NAME,
  MISSING_REGEX_MATCHER: "Please provide a valid regular expression matcher",
  MISSING_DESTINATION: "Please provide a valid URL",
};

export const RedirectForm = ({
  onSuccess,
  defaultValues,
}: {
  defaultValues?: {
    name: string;
    matcher: string;
    destination: string;
  };
  onSuccess?: () => void;
}) => {
  const form = useForm({
    defaultValues,
    onSubmit: onSuccess,
    validators: {
      onSubmit: ({ value }) => {
        return {
          fields: {
            name: validateStringLength({
              value: value.name,
              error: RedirectFormErrors.MISSING_NAME,
            }),
            matcher: validateStringLength({
              value: value.matcher,
              error: RedirectFormErrors.MISSING_REGEX_MATCHER,
            }),
            destination: validateStringLength({
              value: value.destination,
              error: RedirectFormErrors.MISSING_DESTINATION,
            }),
          },
        };
      },
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card style={{ backgroundColor: "#0090FF" }} className={styles.Card}>
        <Flex gap="1" direction={"column"}>
          <Flex gap="1" direction={"column"}>
            <form.Field
              validators={{
                onChange: ({ value }) =>
                  validateStringLength({
                    value,
                    error: RedirectFormErrors.MISSING_NAME,
                  }),
              }}
              name="name"
              children={(field) => {
                return (
                  <TextInput
                    label="Name:"
                    placeholder="Foo Bar"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    errors={field.state.meta.errors}
                  />
                );
              }}
            />
            <form.Field
              validators={{
                onChange: ({ value }) =>
                  validateStringLength({
                    value,
                    error: RedirectFormErrors.MISSING_REGEX_MATCHER,
                  }),
              }}
              name="matcher"
              children={(field) => (
                <TextInput
                  label="RegEx matcher:"
                  placeholder=".*google.com\/(.*)"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  errors={field.state.meta.errors}
                />
              )}
            />
            <form.Field
              validators={{
                onChange: ({ value }) =>
                  validateStringLength({
                    value,
                    error: RedirectFormErrors.MISSING_DESTINATION,
                  }),
              }}
              name="destination"
              children={(field) => (
                <TextInput
                  label="Destination:"
                  placeholder="https://example.com/$1"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  errors={field.state.meta.errors}
                />
              )}
            />
          </Flex>
          <form.Subscribe
            children={() => {
              return (
                <Button style={{ backgroundColor: "black" }}>
                  Create Redirect Interpolation
                </Button>
              );
            }}
          />
        </Flex>
      </Card>
    </form>
  );
};

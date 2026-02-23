import { Button, Card, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { FormErrors } from "#src/constants.ts";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const RedirectFormErrors = {
  MISSING_NAME: FormErrors.MISSING_NAME,
  MISSING_REGEX_MATCHER: "Please provide a valid regular expression matcher",
  MISSING_DESTINATION: "Please provide a valid URL",
};

export interface RedirectFormValue {
  name?: string;
  matcher?: string;
  destination?: string;
}

export enum RedirectFormLabel {
  INTERPOLATION_NAME = "Name:",
  REDIRECT_FROM = "RegEx matcher:",
  REDIRECT_TO = "Destination:",
}

export enum RedirectFormPlaceholder {
  INTERPOLATION_NAME = "From Google to https://example.com",
  REDIRECT_FROM = ".*google\.com/(.*)",
  REDIRECT_TO = "https://example.com/$1",
}

export const RedirectForm = ({
  onSubmit,
  defaultValues,
}: {
  defaultValues?: RedirectFormValue;
  onSubmit?:
    | (({ value }: { value: RedirectFormValue }) => void)
    | (({ value }: { value: RedirectFormValue }) => Promise<void>);
}) => {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await onSubmit?.({ value });
      void formApi.reset({
        name: "",
        matcher: "",
        destination: "",
      });
    },
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.name,
          error: RedirectFormErrors.MISSING_NAME,
        });
        if (nameError) {
          errors.set("name", nameError);
        }

        const matcherError = validateStringLength({
          value: value.matcher,
          error: RedirectFormErrors.MISSING_REGEX_MATCHER,
        });

        if (matcherError) {
          errors.set("matcher", matcherError);
        }

        const destinationError = validateStringLength({
          value: value.destination,
          error: RedirectFormErrors.MISSING_DESTINATION,
        });

        if (destinationError) {
          errors.set("destination", destinationError);
        }

        const isValid = !errors?.size;

        if (isValid) {
          return;
        }

        return {
          fields: {
            name: errors.get("name") ?? null,
            matcher: errors.get("matcher") ?? null,
            destination: errors.get("destination") ?? null,
          },
        };
      },
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <Card style={{ backgroundColor: "#0090FF" }}>
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
                    label={RedirectFormLabel.INTERPOLATION_NAME}
                    placeholder={RedirectFormPlaceholder.INTERPOLATION_NAME}
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
                  label={RedirectFormLabel.REDIRECT_FROM}
                  placeholder={RedirectFormPlaceholder.REDIRECT_FROM}
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
                  label={RedirectFormLabel.REDIRECT_TO}
                  placeholder={RedirectFormPlaceholder.REDIRECT_TO}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  errors={field.state.meta.errors}
                />
              )}
            />
          </Flex>
          <Flex justify={"center"}>
            <Button
              type="submit"
              size="2"
              style={{ cursor: "pointer", backgroundColor: "black" }}
            >
              Create interpolation
              <PlusCircledIcon />
            </Button>
          </Flex>
        </Flex>
      </Card>
    </form>
  );
};

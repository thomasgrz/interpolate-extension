import { FormErrors } from "#src/constants.ts";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";

const HeaderFormErrors = {
  MISSING_NAME: FormErrors.MISSING_NAME,
  MISSING_HEADER_KEY: "Please provide a valid header key",
  MISSING_HEADER_VALUE: "Please provide a valid header value",
};

export enum HeaderFormPlaceholder {
  HEADER_KEY = "x-test-header",
  HEADER_VALUE = "foobar",
  INTERPOLATION_NAME = "My Test Header",
}

export enum HeaderFormLabel {
  INTERPOLATION_NAME = "Name:",
  HEADER_KEY = "Header key:",
  HEADER_VALUE = "Header value:",
}

export interface HeaderFormValue {
  name?: string;
  key?: string;
  value?: string;
}

export const HeaderForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: HeaderFormValue;
  onSubmit?:
    | (({ value }: { value: HeaderFormValue }) => void)
    | (({ value }: { value: HeaderFormValue }) => Promise<void>);
}) => {
  const form = useForm({
    defaultValues,
    onSubmit,
    validators: {
      onSubmit: ({ value }) => {
        const nameError = validateStringLength({
          value: value?.name,
          error: HeaderFormErrors.MISSING_NAME,
        });
        const keyError = validateStringLength({
          value: value?.key,
          error: HeaderFormErrors.MISSING_HEADER_KEY,
        });
        const valueError = validateStringLength({
          value: value?.value,
          error: HeaderFormErrors.MISSING_HEADER_VALUE,
        });

        return {
          fields: {
            name: nameError ?? null,
            key: keyError ?? null,
            value: valueError ?? null,
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
      }}
    >
      <Card style={{ backgroundColor: "#94CE9A" }}>
        <Flex gap="1" direction={"column"}>
          <form.Field
            validators={{
              onChange: ({ value }) =>
                validateStringLength({
                  value,
                  error: HeaderFormErrors.MISSING_NAME,
                }),
            }}
            name="name"
            children={(field) => (
              <TextInput
                label={HeaderFormLabel.INTERPOLATION_NAME}
                placeholder={HeaderFormPlaceholder.INTERPOLATION_NAME}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Field
            validators={{
              onChange: ({ value }) =>
                validateStringLength({
                  value,
                  error: HeaderFormErrors.MISSING_HEADER_KEY,
                }),
            }}
            name="key"
            children={(field) => (
              <TextInput
                label={HeaderFormLabel.HEADER_KEY}
                placeholder={HeaderFormPlaceholder.HEADER_KEY}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Field
            validators={{
              onChange: ({ value }) =>
                validateStringLength({
                  value,
                  error: HeaderFormErrors.MISSING_HEADER_VALUE,
                }),
            }}
            name="value"
            children={(field) => (
              <TextInput
                label={HeaderFormLabel.HEADER_VALUE}
                placeholder={HeaderFormPlaceholder.HEADER_VALUE}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
              />
            )}
          />
          <Flex justify={"center"}>
            <Button
              type="submit"
              size="3"
              style={{ cursor: "pointer", backgroundColor: "black" }}
              onClick={() => form.handleSubmit()}
            >
              Create Interpolation
              <PlusCircledIcon />
            </Button>
          </Flex>
        </Flex>
      </Card>
    </form>
  );
};

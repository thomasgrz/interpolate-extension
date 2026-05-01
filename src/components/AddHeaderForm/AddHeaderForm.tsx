import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { Card, Flex } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import {
  AddHeaderFormErrors,
  AddHeaderFormLabel,
  AddHeaderFormPlaceholder,
} from "./AddHeaderForm.constants";
import TextAreaInput from "../TextArea/TextArea";

export interface AddHeaderFormValue {
  id?: string | number;
  name?: string;
  key?: string;
  value?: string;
}

const handleCreateHeaderInterpolation = async ({
  value,
}: {
  value: AddHeaderFormValue;
}) => {
  const { key, value: headerValue, name } = value;
  const isValid =
    typeof key === "string" &&
    typeof headerValue === "string" &&
    typeof name === "string";

  const isInvalid = !isValid;
  if (isInvalid) return;
  await InterpolateStorage.create(
    createHeaderInterpolation({
      id: value?.id as string,
      headerValue,
      headerKey: key,
      name,
    }),
  );
};

export const AddHeaderForm = ({
  defaultValues,
  onSubmit,
  mode = "create",
}: {
  defaultValues?: AddHeaderFormValue;
  onSubmit?:
    | (({ value }: { value: AddHeaderFormValue }) => void)
    | (({ value }: { value: AddHeaderFormValue }) => Promise<void>);
  mode?: "edit" | "create";
}) => {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      handleCreateHeaderInterpolation({ value });
      void formApi.reset({
        name: "",
        key: "",
        value: "",
      });
      await onSubmit?.({ value });
    },
    validators: {
      onSubmit: ({ value }) => {
        const nameError = validateStringLength({
          value: value?.name,
          error: AddHeaderFormErrors.MISSING_NAME,
        });
        const keyError = validateStringLength({
          value: value?.key,
          error: AddHeaderFormErrors.MISSING_HEADER_KEY,
        });
        const valueError = validateStringLength({
          value: value?.value,
          error: AddHeaderFormErrors.MISSING_HEADER_VALUE,
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
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card style={{ backgroundColor: "#94CE9A" }}>
        <Flex gap="1" direction={"column"}>
          <form.Field
            validators={{
              onChange: ({ value }) =>
                validateStringLength({
                  value,
                  error: AddHeaderFormErrors.MISSING_NAME,
                }),
            }}
            name="name"
            children={(field) => (
              <TextInput
                label={AddHeaderFormLabel.INTERPOLATION_NAME}
                placeholder={AddHeaderFormPlaceholder.INTERPOLATION_NAME}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                value={field.state.value}
              />
            )}
          />
          <form.Field
            validators={{
              onChange: ({ value }) =>
                validateStringLength({
                  value,
                  error: AddHeaderFormErrors.MISSING_HEADER_KEY,
                }),
            }}
            name="key"
            children={(field) => (
              <TextAreaInput
                resize="vertical"
                label={AddHeaderFormLabel.HEADER_KEY}
                placeholder={AddHeaderFormPlaceholder.HEADER_KEY}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                value={field.state.value}
              />
            )}
          />
          <form.Field
            validators={{
              onChange: ({ value }) =>
                validateStringLength({
                  value,
                  error: AddHeaderFormErrors.MISSING_HEADER_VALUE,
                }),
            }}
            name="value"
            children={(field) => (
              <TextAreaInput
                resize="vertical"
                label={AddHeaderFormLabel.HEADER_VALUE}
                placeholder={AddHeaderFormPlaceholder.HEADER_VALUE}
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                value={field.state.value}
              />
            )}
          />
        </Flex>
      </Card>
      <Flex justify={"center"}>
        <SubmitButton>
          {mode === "create" && "Create header"}
          {mode === "edit" && "Save"}
        </SubmitButton>
      </Flex>
    </form>
  );
};

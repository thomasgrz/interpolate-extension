import { Button, Card, Flex } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import TextAreaInput from "../TextArea/TextArea";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import {
  RedirectFormErrors,
  RedirectFormLabel,
  RedirectFormPlaceholder,
  RedirectFormValue,
} from "./RedirectForm.constants";
import styles from "./RedirectRuleForm.module.scss";

const handleCreateRedirectInterpolation = async ({
  value,
}: {
  value: RedirectFormValue;
}) => {
  const { destination, name, matcher } = value;
  const isValid =
    typeof name === "string" &&
    typeof destination === "string" &&
    typeof matcher === "string";
  const isInvalid = !isValid;
  if (isInvalid) return;
  await InterpolateStorage.create(
    createRedirectInterpolation({
      id: value?.id as string,
      source: matcher,
      name: name,
      destination: destination,
    }),
  );
};

export const RedirectForm = ({
  onSubmit,
  onCancelEdit,
  defaultValues,
  mode = "create",
}: {
  defaultValues?: RedirectFormValue;
  onCancelEdit?: () => void;
  onSubmit?:
    | (({ value }: { value: RedirectFormValue }) => void)
    | (({ value }: { value: RedirectFormValue }) => Promise<void>);
  mode?: "create" | "edit";
}) => {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await handleCreateRedirectInterpolation({ value });
      void formApi.reset({
        name: "",
        matcher: "",
        destination: "",
      });
      await onSubmit?.({ value });
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
      <Card
        style={{ backgroundColor: "var(--blue-5)" }}
        className={styles.Card}
      >
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
                <TextAreaInput
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
                <TextAreaInput
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
        </Flex>
      </Card>
      <Flex justify={mode === "create" ? "end" : "between"} align="end">
        {mode === "edit" && (
          <Button radius="full" variant="outline" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
        https://google.com
        <SubmitButton>
          {mode === "create" && "Create redirect"}
          {mode === "edit" && "Save redirect"}
        </SubmitButton>
      </Flex>
    </form>
  );
};

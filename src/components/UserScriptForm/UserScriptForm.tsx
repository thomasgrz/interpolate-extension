import { Card, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { ScriptsPermissionWarning } from "../ScriptsPermissionWarning/ScriptsPermissionWarning";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import TextAreaInput from "../TextArea/TextArea";
import SelectField from "../SelectField/SelectField";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import {
  UserScriptFormPlaceholder,
  UserScriptFormValidationError,
  UserScriptFormValue,
} from "./UserScriptForm.types";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createScriptInterpolation } from "#src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";
import { SubmitButton } from "../SubmitButton/SubmitButton";

const handleCreateScriptInterpolation = async ({
  value,
}: {
  value: Required<UserScriptFormValue>;
}) => {
  await InterpolateStorage.create(createScriptInterpolation(value));
};

export const UserScriptForm = ({
  defaultValues = {
    runAt: "document_start",
  },
  onSubmit,
  mode = "create",
}: {
  onSubmit?:
    | (({ value }: { value: UserScriptFormValue }) => void)
    | (({ value }: { value: UserScriptFormValue }) => Promise<void>);
  defaultValues?: UserScriptFormValue;
  mode?: "create" | "edit";
}) => {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.name,
          error: UserScriptFormValidationError.INTERPOLATION_NAME,
        });

        if (nameError) {
          errors.set("name", nameError);
        }

        const scriptBodyError = validateStringLength({
          value: value.script,
          error: UserScriptFormValidationError.SCRIPT_BODY,
        });

        if (scriptBodyError) {
          errors.set("script", scriptBodyError);
        }

        const isValid = !errors.size;

        const isInvalid = !isValid;

        if (isInvalid) {
          return {
            name: errors.get("name"),
            script: errors.get("script"),
          };
        }

        return;
      },
    },
    onSubmit: async ({ value, formApi }) => {
      await onSubmit?.({ value });
      await handleCreateScriptInterpolation({
        value: {
          id: defaultValues?.id as string,
          ...value,
          runAt: value?.runAt ?? "document_start",
        } as Required<UserScriptFormValue>,
      });
      void formApi.reset({
        name: "",
        runAt: "",
        script: "",
      });
    },
  });

  const [showWarning, setShowWarning] = useState<boolean>(false);

  const options = ["document_idle", "document_end", "document_start"].map(
    (item) => ({
      label: item,
      value: item,
    }),
  );

  useEffect(() => {
    try {
      chrome.userScripts.getScripts();
    } catch (e) {
      setShowWarning(true);
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card style={{ backgroundColor: "#E1D9FF" }}>
        <Flex gap="1" direction={"column"}>
          {showWarning && <ScriptsPermissionWarning />}
          <form.Field
            validators={{
              onChange({ value }) {
                return validateStringLength({
                  value,
                  error: UserScriptFormValidationError.INTERPOLATION_NAME,
                });
              },
            }}
            name="name"
            children={(field) => (
              <TextInput
                id="name-field"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                label="Name:"
                placeholder="My Cool Script"
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Field
            validators={{
              onChange({ value }) {
                return validateStringLength({
                  value,
                  error: UserScriptFormValidationError.SCRIPT_BODY,
                });
              },
            }}
            name="script"
            children={(field) => (
              <TextAreaInput
                label="Script:"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={UserScriptFormPlaceholder.SCRIPT_BODY}
                errors={field.state.meta.errors}
              />
            )}
          />
          <form.Field
            name="runAt"
            children={(field) => (
              <SelectField
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                options={options}
                label={"When:"}
              />
            )}
          />
        </Flex>
      </Card>
      <Flex pt="2" justify={"center"}>
        <SubmitButton disabled={showWarning}>
          {mode === "create" && "Create script"}
          {mode === "edit" && "Save script"}
        </SubmitButton>
      </Flex>
    </form>
  );
};

import { Card, Flex, Button } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ScriptsPermissionWarning } from "../ScriptsPermissionWarning/ScriptsPermissionWarning";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import TextAreaInput from "../TextArea/TextArea";
import SelectField from "../SelectField/SelectField";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import {
  ScriptFormPlaceholder,
  ScriptFormValidationError,
  ScriptFormValue,
} from "./ScriptForm.types";

export const ScriptForm = ({
  defaultValues = {
    runAt: "document_start",
  },
  onSubmit,
}: {
  onSubmit?:
    | (({ value }: { value: ScriptFormValue }) => void)
    | (({ value }: { value: ScriptFormValue }) => Promise<void>);
  defaultValues?: ScriptFormValue;
}) => {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.name,
          error: ScriptFormValidationError.INTERPOLATION_NAME,
        });

        if (nameError) {
          errors.set("name", nameError);
        }

        const scriptBodyError = validateStringLength({
          value: value.script,
          error: ScriptFormValidationError.SCRIPT_BODY,
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
    <Card style={{ backgroundColor: "#E1D9FF" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Flex gap="1" direction={"column"}>
          {showWarning && <ScriptsPermissionWarning />}
          <form.Field
            validators={{
              onChange({ value }) {
                return validateStringLength({
                  value,
                  error: ScriptFormValidationError.INTERPOLATION_NAME,
                });
              },
            }}
            name="name"
            children={(field) => (
              <TextInput
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
                  error: ScriptFormValidationError.SCRIPT_BODY,
                });
              },
            }}
            name="script"
            children={(field) => (
              <TextAreaInput
                label="Script:"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={ScriptFormPlaceholder.SCRIPT_BODY}
                errors={field.state.meta.errors}
              />
            )}
          />

          {/* <form.Field */}
          {/*   name="matches" */}
          {/*   validators={{ */}
          {/*     onChange({ value }) { */}
          {/*       return validateStringLength({ */}
          {/*         value, */}
          {/*         error: ScriptFormValidationError.MATCHER, */}
          {/*       }); */}
          {/*     }, */}
          {/*   }} */}
          {/*   children={(field) => ( */}
          {/*     <TextInput */}
          {/*       value={field.state.value} */}
          {/*       onChange={(e) => field.handleChange(e.target.value)} */}
          {/*       onBlur={field.handleBlur} */}
          {/*       label="RegEx matcher:" */}
          {/*       errors={field.state.meta.errors} */}
          {/*     /> */}
          {/*   )} */}
          {/* /> */}
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
        <Flex pt="2" justify={"center"}>
          <Button
            type="submit"
            disabled={showWarning}
            size="2"
            style={{
              ...(!showWarning
                ? { cursor: "pointer", backgroundColor: "black" }
                : {}),
            }}
          >
            Create interpolation <PlusCircledIcon />
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

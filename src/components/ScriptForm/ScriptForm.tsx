import { Card, Flex, Button } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ScriptsPermissionWarning } from "../ScriptsPermissionWarning/ScriptsPermissionWarning";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import TextAreaInput from "../TextArea/TextArea";
import SelectField from "../SelectField/SelectField";

export interface ScriptFormValue {
  name?: string;
  matches?: string;
  runAt?: string;
  script?: string;
}

export const ScriptForm = ({
  defaultValues,
  onSubmit,
}: {
  onSubmit?:
    | (({ value }: { value: ScriptFormValue }) => void)
    | (({ value }: { value: ScriptFormValue }) => Promise<void>);
  defaultValues?: ScriptFormValue;
}) => {
  const form = useForm({
    defaultValues,
    onSubmit,
  });
  const validators = {
    onChange: ({ value }: { value?: unknown }) =>
      typeof value !== "string" || value?.trim()?.length
        ? undefined
        : "Please enter a valid input.",
  };

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
            validators={validators}
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
            validators={validators}
            name="script"
            children={(field) => (
              <TextAreaInput
                label="Script:"
                placeholder="console.log(something);"
                errors={field.state.meta.errors}
              />
            )}
          />

          <form.Field
            name="matches"
            children={(field) => (
              <TextInput
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                label="RegEx matcher:"
                placeholder="*://*/*"
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
        <form.Subscribe>
          <Flex justify={"center"}>
            <Button
              size="3"
              style={{ cursor: "pointer", backgroundColor: "black" }}
            >
              Create interpolation <PlusCircledIcon />
            </Button>
          </Flex>
        </form.Subscribe>
      </form>
    </Card>
  );
};

import { FormType, SubmitAction } from "@/constants";
import { dashboardFormOptions } from "@/contexts/dashboard-context";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { ScriptsPermissionWarning } from "../ScriptsPermissionWarning/ScriptsPermissionWarning";
import { useForm } from "@tanstack/react-form";

export const ScriptForm = ({
  defaultValues,
  onSuccess,
}: {
  defaultValues?: {
    name: string;
    matches: string;
    runAt: string;
    script: string;
  };
}) => {
  const form = useForm();
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Flex gap="1" direction={"column"}>
        {showWarning && <ScriptsPermissionWarning />}
        <form.Field validators={validators} name="scriptForm.name">
          {(field) => (
            <field.TextField label="Rule name:" placeholder="My Cool Script" />
          )}
        </form.Field>
        <form.Field validators={validators} name="scriptForm.body">
          {(field) => (
            <field.TextArea
              htmlFor="script-input"
              label="Script:"
              placeholder="console.log(something);"
            />
          )}
        </form.Field>
        <form.Field name="scriptForm.matches">
          {(field) => (
            <field.TextField label="RegEx matcher:" placeholder="*://*/*" />
          )}
        </form.Field>
        <form.Field name="scriptForm.runAt">
          {(field) => <field.SelectField options={options} label={"When:"} />}
        </form.Field>
        <form.AppForm>
          <form.CreateInterpolationButton label={"Create"} />
        </form.AppForm>
      </Flex>
    </form>
  );
};

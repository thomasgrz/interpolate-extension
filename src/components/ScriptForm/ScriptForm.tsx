import { SubmitAction } from "@/constants";
import { dashboardFormOptions } from "@/contexts/dashboard-context";
import { withForm } from "@/hooks/useForm/useForm";
import { Box, Flex } from "@radix-ui/themes";
import { SubmitButton } from "../SubmitButton/SubmitButton";

export const ScriptForm = withForm({
  ...dashboardFormOptions,
  render: ({ form }) => {
    const validators = {
      onChange: ({ value }: { value?: string }) =>
        value?.trim()?.length ? undefined : "Please enter a valid input.",
    };

    const options = ["document_idle", "document_end", "document_start"].map(
      (item) => ({
        label: item,
        value: item,
      }),
    );

    return (
      <Box p="2">
        <Flex gap="1" direction={"column"}>
          <form.AppField validators={validators} name="scriptForm.name">
            {(field) => (
              <field.TextField
                label="Rule name:"
                placeholder="My Cool Script"
              />
            )}
          </form.AppField>
          <form.AppField validators={validators} name="scriptForm.body">
            {(field) => (
              <field.TextArea
                htmlFor="script-input"
                label="Script:"
                placeholder="console.log(something);"
              />
            )}
          </form.AppField>
          <form.AppField name="scriptForm.matches">
            {(field) => (
              <field.TextField label="RegEx matcher:" placeholder="*://*/*" />
            )}
          </form.AppField>
          <form.AppField name="scriptForm.runAt">
            {(field) => <field.SelectField options={options} label={"When:"} />}
          </form.AppField>
          <SubmitButton
            onClick={() =>
              form.handleSubmit({ submitAction: SubmitAction.CreateScript })
            }
          >
            Create script
          </SubmitButton>
        </Flex>
      </Box>
    );
  },
});

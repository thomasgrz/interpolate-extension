import { dashboardFormOptions } from "@/contexts/dashboard-context.ts";
import { Box, Flex } from "@radix-ui/themes";
import { withForm } from "../../hooks/useForm/useForm";
import styles from "./RedirectRuleForm.module.scss";
import { SubmitButton } from "../SubmitButton/SubmitButton";

export const RedirectForm = withForm({
  ...dashboardFormOptions,
  render: ({ form, editModeEnabled, onSuccess }) => {
    const validators = {
      onChange: ({ value }: { value?: string }) =>
        value?.trim()?.length ? undefined : "Please enter a valid input.",
    };
    return (
      <Box className={styles.Card} p="2">
        <Flex gap="1" direction={"column"}>
          <Flex gap="1" direction={"column"}>
            <form.AppField
              validators={validators}
              name="redirectRuleForm.name"
              children={(field) => {
                return (
                  <div className={styles.Input}>
                    <field.TextField
                      placeholder="Cool Redirect"
                      label="Rule name:"
                    />
                  </div>
                );
              }}
            />
            <form.AppField
              validators={validators}
              name="redirectRuleForm.source"
              children={(field) => (
                <field.TextField
                  placeholder="Example: https://example.com/(.*)"
                  label="Source:"
                />
              )}
            />
            <form.AppField
              validators={validators}
              name="redirectRuleForm.destination"
              children={(field) => (
                <field.TextField
                  placeholder="Example: https://google.com/$1"
                  label="Destination:"
                />
              )}
            />
          </Flex>
          <SubmitButton
            onClick={() => {
              form.handleSubmit({
                submitAction: "add-redirect",
              });
              onSuccess?.();
            }}
          >
            {editModeEnabled ? "Save redirect" : "Create redirect"}
          </SubmitButton>
        </Flex>
      </Box>
    );
  },
});

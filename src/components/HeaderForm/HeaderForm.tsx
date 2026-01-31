import { dashboardFormOptions } from "@/contexts/dashboard-context";
import { withForm } from "@/hooks/useForm/useForm";
import { Box, Flex } from "@radix-ui/themes";
import styles from "./HeaderForm.module.scss";
import { SubmitButton } from "../SubmitButton/SubmitButton";

export const HeaderForm = withForm({
  ...dashboardFormOptions,
  render: ({ form, onSuccess }) => {
    const validators = {
      onChange: ({ value }: { value?: string }) =>
        value?.trim()?.length ? undefined : "Please enter a valid input.",
    };

    return (
      <Box p="2">
        <Flex gap="1" direction={"column"}>
          <form.AppField
            validators={validators}
            name="headerRuleForm.name"
            children={(field) => (
              <div className={styles.Input}>
                <field.TextField placeholder="Cool Header" label="Rule name:" />
              </div>
            )}
          />
          <form.AppField
            validators={validators}
            name="headerRuleForm.key"
            children={(field) => (
              <div className={styles.Input}>
                <field.TextField
                  placeholder="x-Forwarded-For"
                  label="Header key:"
                />
              </div>
            )}
          />
          <form.AppField
            validators={validators}
            name="headerRuleForm.value"
            children={(field) => (
              <field.TextField
                placeholder="http://test.domain.com"
                label="Header value:"
              />
            )}
          />
          <SubmitButton
            onClick={() => {
              form.handleSubmit({ submitAction: "add-header" });
              onSuccess?.();
            }}
          >
            Create header
          </SubmitButton>
        </Flex>
      </Box>
    );
  },
});

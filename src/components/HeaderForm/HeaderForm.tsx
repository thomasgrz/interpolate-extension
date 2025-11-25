import { dashboardFormOptions } from "@/contexts/dashboard-context";
import { withForm } from "@/hooks/useForm/useForm";
import { Box, Button, Flex } from "@radix-ui/themes";
import CardAddIcon from "../../assets/card-add.svg";
import styles from "./HeaderForm.module.scss";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const HeaderForm = withForm({
  ...dashboardFormOptions,
  render: ({ form }) => {
    const validators = {
      onChange: ({ value }: { value?: string }) =>
        value?.trim()?.length ? undefined : "Please enter a valid input.",
    };

    return (
      <Box p="2">
        <Flex gap="1" direction={"column"}>
          <form.AppField
            validators={validators}
            name="headerRuleForm.key"
            children={(field) => (
              <div className={styles.Input}>
                <field.TextField
                  placeholder="x-Forwarded-For"
                  htmlFor="headerKey"
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
                htmlFor="headerValue"
                label="Header value:"
              />
            )}
          />
          <Button
            onClick={() => form.handleSubmit({ submitAction: "add-header" })}
            type="button"
            size="2"
          >
            <PlusCircledIcon />
            Create header
          </Button>
        </Flex>
      </Box>
    );
  },
});

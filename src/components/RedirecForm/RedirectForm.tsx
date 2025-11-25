import { dashboardFormOptions } from "@/contexts/dashboard-context.ts";
import { Box, Button, Flex } from "@radix-ui/themes";
import CardAddIcon from "../../assets/card-add.svg";
import { withForm } from "../../hooks/useForm/useForm";
import styles from "./RedirectRuleForm.module.scss";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const RedirectForm = withForm({
  ...dashboardFormOptions,
  render: ({ form }) => {
    const validators = {
      onChange: ({ value }: { value?: string }) =>
        value?.trim()?.length ? undefined : "Please enter a valid input.",
    };
    return (
      <Box className={styles.Card} p="2">
        <Flex gap="1" direction={"column"}>
          <Flex gap="1" direction={"column"}>
            <Flex direction={"row"}>
              <form.AppField
                validators={validators}
                name="redirectRuleForm.source"
                children={(field) => (
                  <field.TextField
                    placeholder="Example: https://example.com/(.*)"
                    htmlFor="source"
                    label="Source:"
                  />
                )}
              />
            </Flex>
            <form.AppField
              validators={validators}
              name="redirectRuleForm.destination"
              children={(field) => (
                <field.TextField
                  placeholder="Example: https://google.com/$1"
                  htmlFor="source"
                  label="Destination:"
                />
              )}
            />
          </Flex>
          <Button
            onClick={() => form.handleSubmit({ submitAction: "add-redirect" })}
            type="button"
            size="2"
          >
            <PlusCircledIcon />
            Create redirect
          </Button>
        </Flex>
      </Box>
    );
  },
});

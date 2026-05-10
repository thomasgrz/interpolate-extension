import { Card, Flex, Select, Strong, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { FormEventHandler, useEffect, useState } from "react";
import { Form, Label } from "radix-ui";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createTabManagermentInterpolation } from "#src/utils/factories/createTabManagerInterpolation/createTabManagerInterpolation.ts";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { FieldError } from "../FieldError/FieldError";

enum TabMgmtLabel {
  INTERPOLATION_NAME = "name",
  MATCHER = "matcher",
}

enum TabMgmtPlaceholder {
  INTERPOLATION_NAME = "Tab group name",
  MATCHER = ".*gitlab.com.*",
}

enum TabMgmtFormError {
  NAME = "Please provide a name",
  MATCHER = "Please provide a valid regular expression",
  TAB_GROUP = "Please select a tab group",
}

export const TabMgmtForm = ({
  mode,
  onSubmit,
}: {
  mode: "edit" | "create";
  onSubmit: () => void;
}) => {
  const [tabGroups, setTabGroups] = useState<{ title: string; id: number }[]>(
    [],
  );

  const form = useForm({
    defaultValues: {
      regex: null as null | string,
      group: null as null | string,
      name: null as null | string,
    },
    onSubmit: async ({ value }) => {
      const groupName = tabGroups?.find?.(
        (group) => group && String(group?.id) === value.group,
      )?.title;
      await InterpolateStorage.create(
        createTabManagermentInterpolation({
          matcher: value.regex as string,
          groupId: value.group as string,
          groupName: groupName as string,
          name: value.name as string,
        }),
      );
      onSubmit?.();
    },
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.name,
          error: TabMgmtFormError.NAME,
        });

        if (nameError) {
          errors.set("name", nameError);
        }

        const matcherError = validateStringLength({
          value: value.regex,
          error: TabMgmtFormError.MATCHER,
        });

        if (matcherError) {
          errors.set("regex", matcherError);
        }

        const tabGroupError = validateStringLength({
          value: value.group ?? "",
          error: TabMgmtFormError.TAB_GROUP,
        });

        if (tabGroupError) {
          errors.set("group", tabGroupError);
        }

        const isValid = !errors.size;

        if (isValid) {
          return;
        }

        return {
          fields: {
            name: errors.get("name") ?? null,
            regex: errors.get("regex") ?? null,
            group: errors.get("group") ?? null,
          },
        };
      },
    },
  });

  useEffect(() => {
    chrome.tabGroups.query({}).then((_tabGroups) => {
      setTabGroups(_tabGroups as { id: number; title: string }[]);
    });
  }, []);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  };

  const getGroupTitleById = (id?: string) => {
    const noneSelected = !id;
    if (noneSelected) return "no groups available";

    return tabGroups
      ? tabGroups?.find?.((group) => group && String(group?.id) === id)?.title
      : null;
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card style={{ backgroundColor: "var(--orange-5)" }}>
        <Flex width="stretch" direction="column">
          <form.Field
            name="name"
            children={(field) => {
              return (
                <TextInput
                  label={TabMgmtLabel.INTERPOLATION_NAME}
                  placeholder={TabMgmtPlaceholder.INTERPOLATION_NAME}
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                />
              );
            }}
          />
          <form.Field
            name="regex"
            children={(field) => {
              console.log(field.state.value);
              return (
                <TextInput
                  label={TabMgmtLabel.MATCHER}
                  placeholder={TabMgmtPlaceholder.MATCHER}
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                />
              );
            }}
          />
          <form.Field
            name="group"
            children={(field) => {
              return (
                <Flex p="1" width="stretch" flexGrow="grow" direction="column">
                  <Label.Root>
                    <Strong>
                      <Text size="2">group</Text>
                    </Strong>
                  </Label.Root>
                  <Select.Root
                    value={`${field.state.value ?? String(tabGroups[0]?.id)}`}
                    defaultValue={String(tabGroups[0]?.id)}
                    onValueChange={(value) => {
                      field.handleChange(value);
                    }}
                  >
                    <Select.Trigger
                      value={field.state.value as string}
                      placeholder="Select a tab"
                    >
                      {getGroupTitleById(
                        field.state.value as string | undefined,
                      )}
                    </Select.Trigger>
                    <Select.Content>
                      {tabGroups.map((tabGroup) => {
                        return (
                          <Select.Item
                            style={{ width: "stretch" }}
                            value={String(tabGroup?.id)}
                          >
                            {tabGroup.title}
                          </Select.Item>
                        );
                      })}
                    </Select.Content>
                  </Select.Root>
                  <FieldError errors={field.state.meta.errors} />
                </Flex>
              );
            }}
          />
        </Flex>
      </Card>
      <Flex justify={"center"}>
        <SubmitButton>
          {mode === "create" && "Create"}
          {mode === "edit" && "Save"}
        </SubmitButton>
      </Flex>
    </form>
  );
};

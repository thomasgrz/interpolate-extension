import {
  Button,
  Callout,
  Card,
  Flex,
  Select,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { FormEventHandler, useEffect, useState } from "react";
import { Label } from "radix-ui";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createTabManagermentInterpolation } from "#src/utils/factories/createTabManagerInterpolation/createTabManagerInterpolation.ts";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { FieldError } from "../FieldError/FieldError";

enum TabMgmtLabel {
  INTERPOLATION_NAME = "interpolation name",
  MATCHER = "matcher",
}

enum TabMgmtPlaceholder {
  INTERPOLATION_NAME = "interpolation name",
  MATCHER = ".*gitlab.com.*",
}

enum TabManagementFormError {
  NAME = "Please provide a name",
  MATCHER = "Please provide a valid regular expression",
  TAB_GROUP = "Please select a tab group",
}

const TabGroupColor = ({ color }: { color: string }) => (
  <span
    style={{
      boxShadow: "var(--shadow-5)",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      display: "inline-block",
      backgroundColor: color,
    }}
  ></span>
);

export const TabManagementForm = ({
  mode,
  onSubmit,
  onCancelEdit,
  defaultValues,
}: {
  defaultValues?: {
    groupId?: string;
    interpName?: string;
    name?: string;
    id?: string;
    regex?: string;
  };
  mode: "edit" | "create";
  onCancelEdit?: () => void;
  onSubmit: () => void;
}) => {
  const [tabGroups, setTabGroups] = useState<
    { title: string; id: number; color: string }[]
  >([]);

  const [hideWarning, setHideWarning] = useState(false);
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const isInvalid = [value?.groupId, value?.interpName, value?.regex].some(
        (value) => !value,
      );
      if (isInvalid) return;
      const groupName = tabGroups?.find?.(
        (group) => group && String(group?.id) === value.groupId,
      )?.title;
      await InterpolateStorage.create(
        createTabManagermentInterpolation({
          id: defaultValues?.id,
          matcher: value.regex as string,
          groupId: value.groupId as string,
          groupName: groupName as string,
          name: value.interpName as string,
        }),
      );
      onSubmit?.();
    },
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.interpName,
          error: TabManagementFormError.NAME,
        });

        if (nameError) {
          errors.set("interpName", nameError);
        }

        const matcherError = validateStringLength({
          value: value.regex,
          error: TabManagementFormError.MATCHER,
        });

        if (matcherError) {
          errors.set("regex", matcherError);
        }

        const tabGroupError = validateStringLength({
          value: value.groupId ?? "",
          error: TabManagementFormError.TAB_GROUP,
        });

        if (tabGroupError) {
          errors.set("groupId", tabGroupError);
        }

        const isValid = !errors.size;

        if (isValid) {
          return;
        }

        return {
          fields: {
            interpName: errors.get("interpName") ?? null,
            regex: errors.get("regex") ?? null,
            groupId: errors.get("groupId") ?? null,
          },
        };
      },
    },
  });

  useEffect(() => {
    chrome.tabGroups.query({}).then((_tabGroups) => {
      setTabGroups(
        _tabGroups.map((g) => ({ ...g, title: g.title || "untitled" })) as {
          id: number;
          title: string;
          color: string;
        }[],
      );
    });
  }, []);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  };

  const getGroupById = (id?: string) => {
    const noneSelected = !id;
    if (noneSelected) return { title: "", color: "" };

    return tabGroups
      ? tabGroups?.find?.((group) => group && String(group?.id) === id)
      : { title: "", color: "" };
  };

  const isWarningRelevant = !hideWarning;
  const isGroupOutdated =
    isWarningRelevant &&
    mode === "edit" &&
    !getGroupById(defaultValues?.groupId);

  return (
    <form onSubmit={handleSubmit}>
      <Card style={{ backgroundColor: "var(--orange-5)" }}>
        <Flex width="stretch" direction="column">
          <form.Field
            name="interpName"
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
            name="groupId"
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
                      setHideWarning(true);
                    }}
                  >
                    <Select.Trigger
                      value={String(field.state.value)}
                      placeholder="Select a tab"
                    >
                      <Flex gap="3">
                        {
                          getGroupById(field.state.value as string | undefined)
                            ?.title
                        }{" "}
                        <TabGroupColor
                          color={getGroupById(field?.state?.value)?.color ?? ""}
                        />
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      {tabGroups.map((tabGroup) => {
                        return (
                          <Select.Item
                            style={{ width: "stretch" }}
                            value={String(tabGroup?.id)}
                          >
                            <Flex gap="3" justify={"between"} width="stretch">
                              {tabGroup.title}
                              <TabGroupColor color={tabGroup.color} />
                            </Flex>
                          </Select.Item>
                        );
                      })}
                    </Select.Content>
                  </Select.Root>
                  <FieldError errors={field.state.meta.errors} />
                  {isGroupOutdated && (
                    <Callout.Root size="1" mt="1">
                      <Callout.Text size="1">
                        It looks like you may have previously specified a group
                        that no longer exists. Please select a new one.
                      </Callout.Text>
                    </Callout.Root>
                  )}
                </Flex>
              );
            }}
          />
        </Flex>
      </Card>
      <Flex justify={mode === "create" ? "end" : "between"} align="end">
        {mode === "edit" && (
          <Button
            type="button"
            radius="full"
            variant="outline"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        )}
        <SubmitButton>
          {mode === "create" && "Create"}
          {mode === "edit" && "Save"}
        </SubmitButton>
      </Flex>
    </form>
  );
};

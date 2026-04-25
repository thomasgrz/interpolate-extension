import { Callout, Flex, TextArea, Text, Switch } from "@radix-ui/themes";

import { ChangeEvent, useCallback, useState } from "react";
import { InterpolateStorage } from "../../utils/storage/InterpolateStorage/InterpolateStorage";
import { useForm } from "@tanstack/react-form";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { BrowseInterpolations } from "../BrowseInterpolations/BrowseInterpolations";
import { Label } from "radix-ui";
import { TextInput } from "../TextInput/TextInput";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView";

export interface ImportInterpolationsValue {
  json?: string;
}

export const ImportInterpolations = ({
  onSubmit,
  defaultValues,
  onCreate,
}: {
  onCreate: () => void;
  defaultValues?: ImportInterpolationsValue;
  onSubmit?:
    | (({ value }: { value: ImportInterpolationsValue }) => void)
    | (({ value }: { value: ImportInterpolationsValue }) => Promise<void>);
}) => {
  const [textareaInput, setTextAreaInput] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [showGroupNameInput, setShowGroupNameInput] = useState<boolean>(false);
  const [groupNameValue, setGroupNameValue] = useState("");

  const preview = useCallback(() => {
    let parseValue;
    try {
      if (!textareaInput) throw Error("no value");
      parseValue = JSON.parse(textareaInput);
      const parsedArray = Array.isArray(parseValue) ? parseValue : [parseValue];

      if (!parsedArray.length) return <Text>None</Text>;
      return <InterpolationsListView configs={parsedArray} hideRuleToggle />;
    } catch (e) {
      return null;
    }
  }, [textareaInput]);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(event?.target?.value);
      const formattedJson = JSON.stringify(parsed, null, 4);
      setTextAreaInput(formattedJson);
      setError(undefined);
    } catch (e) {
      setError((e as Error).message);
      setTextAreaInput(event.target?.value);
    }
  };

  const onSave = async () => {
    setIsLoading(true);
    try {
      const parsedConfig = JSON.parse(textareaInput ?? "");
      await InterpolateStorage.create(parsedConfig);
      if (showGroupNameInput) {
        await InterpolateStorage.createGroup({
          interpolations: parsedConfig,
          name: groupNameValue,
        });
        onCreate();
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(String((e as Error).message));
    }
  };

  const onChangeName = (value: string) => {
    setGroupNameValue(value);
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await onSubmit?.({ value });
      await onSave();
      void formApi.reset({
        json: "",
      });
    },
    validators: {},
  });

  return (
    <Flex flexGrow={"1"} direction={"column"}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <Flex width="stretch" mt="1" gap="1" align="center" direction="column">
          <TextArea
            resize="vertical"
            value={textareaInput}
            radius="none"
            onChange={onChange}
            size="1"
            placeholder="Define or Copy/Paste an interpolation config object or array of interpolation config objects."
            style={{ minHeight: "150px", width: "stretch" }}
          />
          <Flex align={"center"} width="stretch" justify={"end"}>
            <Label.Root>
              <Flex align="center" gap="3">
                <Text size="1">Create group?</Text>
                <Switch
                  radius="small"
                  onCheckedChange={setShowGroupNameInput}
                />
              </Flex>
            </Label.Root>
          </Flex>
          {showGroupNameInput && (
            <TextInput
              value={groupNameValue}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="My Cool Group Name"
            />
          )}
          <Flex pt="1" gap="1" direction="column" width="stretch">
            {error && (
              <Callout.Root>
                <Callout.Text size="1">{error}</Callout.Text>
              </Callout.Root>
            )}
            {preview()}
          </Flex>
          <Flex width="stretch" pt="1" gap="1" direction="column">
            <BrowseInterpolations />
            <SubmitButton disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </SubmitButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

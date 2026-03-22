import {
  Callout,
  Box,
  Flex,
  Button,
  TextArea,
  Tabs,
  Text,
  Link,
} from "@radix-ui/themes";

import { InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useCallback, useState } from "react";
import { InterpolateStorage } from "../../utils/storage/InterpolateStorage/InterpolateStorage";
import { useForm } from "@tanstack/react-form";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";

export interface ImportInterpolationsValue {
  json?: string;
}

export const ImportInterpolations = ({
  onSubmit,
  defaultValues,
}: {
  defaultValues?: ImportInterpolationsValue;
  onSubmit?:
    | (({ value }: { value: ImportInterpolationsValue }) => void)
    | (({ value }: { value: ImportInterpolationsValue }) => Promise<void>);
}) => {
  const [textareaInput, setTextAreaInput] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const preview = useCallback(() => {
    let parseValue;
    try {
      if (!textareaInput) throw Error("no value");
      parseValue = JSON.parse(textareaInput);
      const parsedArray = Array.isArray(parseValue) ? parseValue : [parseValue];
      const interpolations = parsedArray.map((interp?: AnyInterpolation) => {
        switch (interp?.type) {
          case "headers":
            return <InterpolationCard hideRuleToggle info={interp} />;
          case "redirect":
            return <InterpolationCard hideRuleToggle info={interp} />;
          case "mockAPI":
            return <InterpolationCard hideRuleToggle info={interp} />;
          case "script":
            return <InterpolationCard hideRuleToggle info={interp} />;
          default:
            return null;
        }
      });
      return interpolations?.length ? interpolations : <Text>None</Text>;
    } catch (e) {
      return null;
    }
  }, [textareaInput]);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaInput(event.target?.value);
  };

  const onSave = async () => {
    setIsLoading(true);
    try {
      const parsedConfig = JSON.parse(textareaInput ?? "");
      await InterpolateStorage.create(parsedConfig);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(String((e as Error).message));
    }
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await onSubmit?.({ value });
      void formApi.reset({
        json: "",
      });
    },
    validators: {},
  });

  return (
    <Flex flexGrow={"1"} direction={"column"}>
      <Text size="1">Looking for example configurations?</Text>
      <Text size="1">
        See our collection of <Link>presets</Link>.
      </Text>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <TextArea
          resize="vertical"
          value={textareaInput}
          radius="none"
          onChange={onChange}
          size="3"
          placeholder="Define or Copy/Paste an interpolation config object or array of interpolation config objects."
          style={{ minHeight: "150px" }}
        />
        <Flex mt="1" gap="1" align="center" direction="column">
          {error && (
            <Callout.Root>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Flex pt="1" gap="1" direction="column">
            {preview()}
          </Flex>
          <Box pt="1">
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={isLoading}
              onClick={onSave}
            >
              Create interpolations <PlusCircledIcon />
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};

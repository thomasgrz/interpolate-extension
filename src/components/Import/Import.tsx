import { Callout, Box, Flex, Button, TextArea } from "@radix-ui/themes";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";
import { InterpolateStorage } from "../../utils/storage/InterpolateStorage/InterpolateStorage";
import { useForm } from "@tanstack/react-form";

export interface ImportFormValue {
  json?: string;
}

export const ImportForm = ({
  onSubmit,
  defaultValues,
}: {
  defaultValues?: ImportFormValue;
  onSubmit?:
    | (({ value }: { value: ImportFormValue }) => void)
    | (({ value }: { value: ImportFormValue }) => Promise<void>);
}) => {
  const [textareaInput, setTextAreaInput] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <TextArea
        value={textareaInput}
        onChange={onChange}
        size="3"
        placeholder="paste config here..."
      />
      <Flex mt="1" gap="1" align="center" direction="column">
        {error && (
          <Callout.Root>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
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
  );
};

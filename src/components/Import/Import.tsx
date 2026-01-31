import {
  Callout,
  DropdownMenu,
  Box,
  Flex,
  Button,
  Dialog,
  TextArea,
} from "@radix-ui/themes";

import { DownloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { InterpolateStorage } from "../../utils/storage/InterpolateStorage/InterpolateStorage";

export const Import = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [textareaInput, setTextAreaInput] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const onChange = (event) => {
    setTextAreaInput(event.target?.value);
  };

  const onSave = async () => {
    setIsLoading(true);
    try {
      const parsedConfig = JSON.parse(textareaInput);
      await InterpolateStorage.create(parsedConfig);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(String(e.message));
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="blue">
          Import <DownloadIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <TextArea
          padding="0"
          value={textareaInput}
          onChange={onChange}
          size="3"
          placeholder="paste config here..."
        />
        <Flex flexGrow justify="end">
          {error && (
            <Callout.Root>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <Box pt="1">
            <Button disabled={isLoading} onClick={onSave}>
              Save
            </Button>
          </Box>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

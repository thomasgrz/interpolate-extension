import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Text,
  ScrollArea,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { useMemo, useState } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import {
  createGroupId,
  GroupConfigInStorage,
} from "#src/utils/factories/InterpolationGroup.ts";
import styles from "./CreateGroupView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView";
import {
  CreateGroupFormError,
  CreateGroupLabel,
  CreateGroupPlaceholder,
} from "./CreateGroupView.constants";

export const CreateGroupView = ({
  hideTrigger,
  forceOpen,
  onSuccess,
  onOpenChange,
  config,
}: {
  config?:
    | (GroupConfigInStorage & { interpolations: AnyInterpolation[] })
    | null;
  forceOpen?: boolean;
  hideTrigger?: boolean;
  onSuccess?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}) => {
  const { interpolations } = useInterpolationsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState<
    Record<string, { isChecked: boolean } & AnyInterpolation>
  >(
    config?.interpolations.reduce((acc, current) => {
      return {
        ...acc,
        [current.details.id]: {
          isChecked: true,
          ...current,
        },
      };
    }, {}) ?? {},
  );
  const numOfSelected = Object.values(selectedStates)?.filter(
    ({ isChecked }) => isChecked,
  ).length;

  const selectedInterpolations = useMemo(() => {
    const interpolationsWithCheckedData = Object.values(selectedStates)?.filter(
      (item) => item.isChecked,
    );
    const selected = interpolationsWithCheckedData.map((item) => {
      const { isChecked, ...interpolation } = item;
      return interpolation;
    });

    return selected;
  }, [selectedStates, config]);

  const form = useForm({
    defaultValues: {
      name: config?.name ?? "",
    },
    onSubmit: async ({ value, formApi }) => {
      await InterpolateStorage.createGroup({
        name: value?.name,
        interpolations: selectedInterpolations,
        groupId: config?.groupId ?? createGroupId(),
      });
      onSuccess?.();
      setIsOpen(false);
      formApi?.reset();
    },
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.name,
          error: CreateGroupFormError.NAME,
        });
        if (nameError) {
          errors.set("name", nameError);
        }

        const isValid = !errors?.size;

        if (isValid) {
          return;
        }

        return {
          fields: {
            name: errors.get("name") ?? null,
          },
        };
      },
    },
  });

  const handleCheckboxChange = (arg: {
    checked: boolean;
    interpolation: AnyInterpolation;
  }) => {
    const { interpolation, checked } = arg;
    setSelectedStates((prev) => {
      return {
        ...prev,
        [interpolation?.details?.id]: {
          isChecked: checked,
          ...interpolation,
        },
      };
    });
  };

  const handleOnOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    onOpenChange?.(isOpen);
    setSelectedStates({});
  };
  return (
    <Box>
      <Dialog.Root open={forceOpen ?? isOpen} onOpenChange={handleOnOpenChange}>
        {hideTrigger ? null : (
          <Dialog.Trigger>
            <Button
              radius="full"
              onClick={() => setIsOpen(true)}
              color="gray"
              variant="outline"
              size="1"
            >
              <PlusIcon />
              Create group
            </Button>
          </Dialog.Trigger>
        )}
        <Dialog.Content className={styles.CreateGroupView}>
          <Flex
            direction="column"
            style={{ maxHeight: "100%", height: "100%", overflow: "hidden" }}
          >
            <form
              style={{ height: "70%" }}
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
              }}
            >
              <Flex justify={"center"}>
                <Heading size="3">{config ? "Edit" : "Create"} group</Heading>
              </Flex>
              <form.Field
                name="name"
                children={(field) => (
                  <TextInput
                    onChange={(e) => field.handleChange(e.target.value)}
                    errors={field.state.meta.errors}
                    placeholder={CreateGroupPlaceholder.NAME}
                    label={CreateGroupLabel.NAME}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                  />
                )}
              />
              <ScrollArea style={{ height: "100%" }}>
                <Flex gap="2" direction="column" maxHeight="100%">
                  <InterpolationsListView
                    configs={interpolations}
                    hideDeleteButton
                    hideRuleToggle
                    showCheckboxes
                    onInterpolationCheckboxChange={handleCheckboxChange}
                  />
                </Flex>
              </ScrollArea>
              <Flex width="stretch" justify="start" pt="3">
                <Text size="2">{numOfSelected} selected</Text>
              </Flex>
              <Flex align="end" justify="between">
                <Button type="button" onClick={() => handleOnOpenChange(false)}>
                  <CrossCircledIcon />
                  Cancel
                </Button>
                <SubmitButton>{config ? "Save" : "Create"} group</SubmitButton>
              </Flex>
            </form>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

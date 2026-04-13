import { PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Heading,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { TextInput } from "../TextInput/TextInput";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { useMemo, useState } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { Label } from "radix-ui";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";

export enum CreateGroupLabel {
  NAME = "Group name:",
}

export enum CreateGroupFormError {
  NAME = "Please define a name for this group",
}

const makeGroupId = (name: string) => {
  return `group-config-${name?.trim?.()?.toLowerCase?.()}`;
};
export const CreateGroupView = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { interpolations } = useInterpolationsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState<
    Record<string, { isChecked: boolean } & AnyInterpolation>
  >({});
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
  }, [selectedStates]);

  const form = useForm({
    defaultValues: {
      groupName: "",
    },
    onSubmit: async ({ value, formApi }) => {
      await InterpolateStorage.createGroup({
        name: value?.groupName,
        interpolations: selectedInterpolations,
        groupId: makeGroupId(value?.groupName),
      });
      onSuccess?.();
      setIsOpen(false);
      formApi?.reset();
    },
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.groupName,
          error: CreateGroupFormError.NAME,
        });
        if (nameError) {
          errors.set("groupName", nameError);
        }

        const interpsErrors =
          numOfSelected < 1 ? "Please select 1 or more interpolations" : null;

        if (interpsErrors) {
          errors.set("interps", interpsErrors);
        }
        const isValid = !errors?.size;

        if (isValid) {
          return;
        }

        return {
          fields: {
            groupName: errors.get("groupName") ?? null,
          },
        };
      },
    },
  });

  const handleChange = (e: MouseEvent, interp: AnyInterpolation) => {
    // @ts-expect-error TODO: fix types
    const isCheckedAfterChange = e?.target?.ariaChecked === "false";
    setSelectedStates((prev) => {
      return {
        ...prev,
        [interp?.details?.id]: {
          isChecked: isCheckedAfterChange,
          ...interp,
        },
      };
    });
  };

  return (
    <Box p="2">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
          <Button
            onClick={() => setIsOpen(true)}
            color="gray"
            variant="outline"
            size="1"
          >
            <PlusIcon /> Create group
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Flex justify={"center"}>
            <Heading size="3">Create group</Heading>
          </Flex>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await form.handleSubmit();
            }}
          >
            <form.Field
              name="groupName"
              children={(field) => (
                <TextInput
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                  placeholder="My Favorite Interpolations"
                  label={CreateGroupLabel.NAME}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                />
              )}
            />
            <Label.Root>
              <Strong>
                <Text size="2">Interpolations:</Text>
              </Strong>
            </Label.Root>
            <Flex gap="2" direction="column">
              {interpolations?.map?.((interp) => {
                return (
                  <Flex width="stretch" flexGrow="1" gap="2" align="center">
                    <Checkbox
                      key={interp?.details?.id}
                      // @ts-expect-error TODO: fix types
                      onClick={(e) => handleChange(e, interp)}
                    />
                    <InterpolationCard hideRuleToggle info={interp} />
                  </Flex>
                );
              })}
            </Flex>
            <Flex align="end" justify="between">
              <Text size="2">{numOfSelected} selected</Text>
              <SubmitButton disabled={numOfSelected < 1}>
                Create group
              </SubmitButton>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

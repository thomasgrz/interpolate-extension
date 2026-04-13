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
import { GroupConfigInStorage } from "#src/utils/factories/InterpolationGroup.ts";

export enum CreateGroupLabel {
  NAME = "Group name:",
}

export enum CreateGroupFormError {
  NAME = "Please define a name for this group",
}

export const CreateGroupView = ({
  hideTrigger,
  forceOpen,
  onSuccess,
  onOpenChange,
  config,
}: {
  config?: { groupName: string; interpolations: AnyInterpolation[] } | null;
  forceOpen?: boolean;
  hideTrigger?: boolean;
  onSuccess?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}) => {
  const { interpolations } = useInterpolationsContext();
  const [isOpen, setIsOpen] = useState(false);
  const allSelectedFromConfig =
    config?.interpolations.reduce((acc, current) => {
      return {
        ...acc,
        [current.details.id]: {
          isChecked: true,
          ...current,
        },
      };
    }, {}) ?? {};
  const [selectedStates, setSelectedStates] = useState<
    Record<string, { isChecked: boolean } & AnyInterpolation>
  >(config ? allSelectedFromConfig : {});
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
      groupName: config?.groupName ?? "",
    },
    onSubmit: async ({ value, formApi }) => {
      await InterpolateStorage.createGroup({
        name: value?.groupName,
        interpolations: selectedInterpolations,
        groupId: InterpolateStorage.makeGroupId(value?.groupName),
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
    <Box>
      <Dialog.Root
        open={forceOpen ?? isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          onOpenChange?.(open);
        }}
      >
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
        <Dialog.Content>
          <Flex justify={"center"}>
            <Heading size="3">{config ? "Edit" : "Create"} group</Heading>
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
            <Flex gap="2" direction="column" pt="3">
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
                {config ? "Save" : "Create"} group
              </SubmitButton>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

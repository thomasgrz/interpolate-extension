import { Box, Card, Flex, SegmentedControl, Strong } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { FormEvent, useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Label } from "radix-ui";
import TextAreaInput from "../TextArea/TextArea";
import { validateStringLength } from "#src/utils/validators/validateStringLength.ts";
import { createMockAPIInterpolation } from "#src/utils/factories/createMockAPIInterpolation/createMockAPIInterpolation.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import {
  MockResponseFormErrors,
  MockResponseFormLabel,
  MockResponseFormPlaceholder,
} from "./MockResponseForm.constants";

export interface MockResponseFormValue {
  id?: string | number;
  name?: string;
  matcher?: string;
  httpCode?: number;
  body?: string;
  isJson?: boolean;
}

interface MockResponseFormProps {
  onSubmit: ({ value }: { value: MockResponseFormValue }) => void;
  defaultValues?: Partial<MockResponseFormValue>;
  mode?: "edit" | "create";
}
const handleCreateMockAPIInterpolation = async ({
  value,
}: {
  value: MockResponseFormValue;
}) => {
  // @ts-expect-error TODO: FIXME
  await InterpolateStorage.create(createMockAPIInterpolation(value));
};

export const MockResponseForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
}: MockResponseFormProps) => {
  const [responseType, setResponseType] = useState("html");
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      const isJson = responseType === "json";
      handleCreateMockAPIInterpolation({ value: { ...value, isJson } });
      onSubmit?.({ value });
      void formApi.reset({
        id: "",
        name: "",
        matcher: "",
        httpCode: 200,
        body: "",
      });
    },
    validators: {
      onSubmit({ value }) {
        const errors = new Map();
        const nameError = validateStringLength({
          value: value.name,
          error: MockResponseFormErrors.INTERPOLATION_NAME,
        });

        if (nameError) {
          errors.set("name", nameError);
        }

        const matcherError = validateStringLength({
          value: value.matcher,
          error: MockResponseFormErrors.MATCHER,
        });

        if (matcherError) {
          errors.set("matcher", matcherError);
        }

        const isJson = responseType === "json";

        if (isJson && value?.body) {
          try {
            JSON.parse(value?.body);
          } catch (e) {
            errors.set("body", "Invalid JSON.");
          }
        }

        const isValid = !errors?.size;

        if (isValid) {
          return;
        }

        return {
          fields: {
            name: errors.get("name") ?? null,
            matcher: errors.get("matcher") ?? null,
            body: errors.get("body") ?? null,
          },
        };
      },
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  };

  const handleChangeResponseType = (type: "json" | "html") => {
    setResponseType(type);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card style={{ backgroundColor: "#FFDE21", width: "stretch" }}>
        <Flex direction="column">
          <form.Field
            name="name"
            children={(field) => {
              return (
                <TextInput
                  label={MockResponseFormLabel.INTERPOLATION_NAME}
                  placeholder={MockResponseFormPlaceholder.INTERPOLATION_NAME}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                />
              );
            }}
          />
          <form.Field
            name="httpCode"
            children={(field) => {
              return (
                <TextInput
                  label={MockResponseFormLabel.HTTP_STATUS}
                  placeholder={MockResponseFormPlaceholder.HTTP_STATUS}
                  value={field.state.value}
                  // @ts-expect-error TODO fixme
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                  type="number"
                />
              );
            }}
          />
          <form.Field
            name="matcher"
            children={(field) => {
              return (
                <TextInput
                  label={MockResponseFormLabel.MATCHER}
                  placeholder={MockResponseFormPlaceholder.MATCHER}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                />
              );
            }}
          />
          <form.Field
            name="body"
            children={(field) => {
              return (
                <Box>
                  <Flex direction={"column"} gap="1" p="1" maxWidth="250px">
                    <Label.Root>
                      <Strong>Response:</Strong>
                    </Label.Root>
                    <SegmentedControl.Root
                      size="1"
                      onValueChange={handleChangeResponseType}
                      radius="full"
                      value={responseType}
                    >
                      <SegmentedControl.Item value="html">
                        HTML
                      </SegmentedControl.Item>
                      <SegmentedControl.Item value="json">
                        JSON
                      </SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Flex>
                  {responseType === "html" && (
                    <TextAreaInput
                      placeholder={MockResponseFormPlaceholder.BODY_HTML}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      errors={field.state.meta.errors}
                    />
                  )}
                  {responseType === "json" && (
                    <TextAreaInput
                      placeholder={MockResponseFormPlaceholder.BODY_JSON}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      errors={field.state.meta.errors}
                    />
                  )}
                </Box>
              );
            }}
          />
        </Flex>
      </Card>
      <Flex justify={"center"}>
        <SubmitButton>
          {mode === "create" && "Create mock"}
          {mode === "edit" && "Save"}
        </SubmitButton>
      </Flex>
    </form>
  );
};

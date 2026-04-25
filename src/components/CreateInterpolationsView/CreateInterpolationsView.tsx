import { Dialog, Button, Flex } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  CodeIcon,
  DownloadIcon,
  FileTextIcon,
  MoveIcon,
  PlusCircledIcon,
  RocketIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

import { InterpolationOptionCard } from "../InterpolationOptionCard/InterpolationOptionCard";
import styles from "./CreateInterpolationsView.module.scss";
import { useMemo, useState } from "react";
import { AddHeaderForm } from "../AddHeaderForm/AddHeaderForm";
import { UserScriptForm } from "../UserScriptForm/UserScriptForm";
import { RedirectForm } from "../RedirectForm/RedirectForm";
import { ExportInterpolations } from "../ExportInterpolations/ExportInterpolations";
import { ImportInterpolations } from "../ImportInterpolations/ImportInterpolations.tsx";
import { MockResponseForm } from "../MockResponseForm/MockResponseForm";
import { BrowseInterpolations } from "../BrowseInterpolations/BrowseInterpolations.tsx";

export enum InterpolationOptionSelection {
  OPTIONS_VIEW = "options-view",
  ADD_HEADERS = "add-headers",
  CREATE_USER_SCRIPT = "create-user-script",
  REDIRECT_REQUEST = "redirect-request",
  IMPORT = "import",
  EXPORT = "export",
  MOCK_RESPONSE = "mock-resposne",
}

const FormSelectionStep = ({
  onChange,
}: {
  onChange: (value: InterpolationOptionSelection) => void;
}) => {
  return (
    <Flex gap="1" direction="column">
      <InterpolationOptionCard
        heading="Add headers"
        subHeading="Append a header key-value pair to all outbound requests."
        icon={FileTextIcon}
        onClick={() => {
          onChange(InterpolationOptionSelection.ADD_HEADERS);
        }}
        color="#94CE9A"
      />
      <InterpolationOptionCard
        heading="Create user script"
        subHeading="Execute a script during a specific page lifecycle event"
        icon={CodeIcon}
        onClick={() =>
          onChange(InterpolationOptionSelection.CREATE_USER_SCRIPT)
        }
        color="#CF91D8"
      />
      <InterpolationOptionCard
        heading="Redirect requests"
        subHeading="Intercept & redirect outbound requests that match a specific regex pattern"
        icon={MoveIcon}
        onClick={() => onChange(InterpolationOptionSelection.REDIRECT_REQUEST)}
        color="#8EC8F6"
      />
      <InterpolationOptionCard
        heading={"Mock API response"}
        subHeading="Provide a mocked response to requests whose URL matches an specific regular expression"
        icon={RocketIcon}
        color="#FFDE21"
        onClick={() => onChange(InterpolationOptionSelection.MOCK_RESPONSE)}
      />
      <Flex gap="1" flexGrow={"1"} width="stretch">
        <InterpolationOptionCard
          heading="Import"
          icon={DownloadIcon}
          color="white"
          onClick={() => onChange(InterpolationOptionSelection.IMPORT)}
        />
        <InterpolationOptionCard
          heading="Export"
          icon={UploadIcon}
          onClick={() => onChange(InterpolationOptionSelection.EXPORT)}
          color="#0090FF"
        />
      </Flex>
      <BrowseInterpolations />
    </Flex>
  );
};

export const CreateInterpolationsView = ({
  onOpenChange,
  isOpen,
  onCreate,
}: {
  onOpenChange: (value: boolean) => void;
  isOpen: boolean;
  onCreate: () => void;
}) => {
  const [step, setStep] = useState(InterpolationOptionSelection.OPTIONS_VIEW);
  const handleChange = (value: InterpolationOptionSelection) => {
    setStep(value);
  };
  const title = useMemo(() => {
    switch (step) {
      case InterpolationOptionSelection.OPTIONS_VIEW:
        return null;
      case InterpolationOptionSelection.ADD_HEADERS:
        return "Add headers";
      case InterpolationOptionSelection.CREATE_USER_SCRIPT:
        return "Create user script";
      case InterpolationOptionSelection.EXPORT:
        return "Export configurations";
      case InterpolationOptionSelection.IMPORT:
        return "Import configurations";
      case InterpolationOptionSelection.REDIRECT_REQUEST:
        return "Redirect requests";
      case InterpolationOptionSelection.MOCK_RESPONSE:
        return "Mock response";
      default:
        return "";
    }
  }, [step]);

  const handleOnOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (step !== InterpolationOptionSelection.OPTIONS_VIEW) {
      setStep(InterpolationOptionSelection.OPTIONS_VIEW);
    }
  };

  const handleFormSubmit = () => {
    handleOnOpenChange(false);
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOnOpenChange}>
      <Dialog.Trigger>
        <Flex justify={"center"} width="stretch">
          <Button
            className={styles.CreateInterpolationsView}
            radius="full"
            style={{ width: "250px", backgroundColor: "black" }}
          >
            <PlusCircledIcon />
            Create interpolation
          </Button>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className={styles.DialogContent}>
        <Flex
          minHeight="100%"
          height="stretch"
          flexGrow="1"
          direction={"column"}
        >
          {step !== InterpolationOptionSelection.OPTIONS_VIEW && (
            <Dialog.Title align="center">
              <Flex align="center" gap="2" justify={"center"}>
                <ChevronLeftIcon
                  onClick={() => {
                    setStep(InterpolationOptionSelection.OPTIONS_VIEW);
                  }}
                  cursor="pointer"
                  height="1rem"
                  width="1rem"
                />
                {title}
              </Flex>
            </Dialog.Title>
          )}
          {step === InterpolationOptionSelection.OPTIONS_VIEW && (
            <FormSelectionStep onChange={handleChange} />
          )}
          {step === InterpolationOptionSelection.ADD_HEADERS && (
            <AddHeaderForm onSubmit={handleFormSubmit} />
          )}
          {step === InterpolationOptionSelection.CREATE_USER_SCRIPT && (
            <UserScriptForm onSubmit={handleFormSubmit} />
          )}
          {step === InterpolationOptionSelection.REDIRECT_REQUEST && (
            <RedirectForm onSubmit={handleFormSubmit} />
          )}
          {step === InterpolationOptionSelection.EXPORT && (
            <ExportInterpolations />
          )}
          {step === InterpolationOptionSelection.IMPORT && (
            <ImportInterpolations
              onCreate={onCreate}
              onSubmit={handleFormSubmit}
            />
          )}
          {step === InterpolationOptionSelection.MOCK_RESPONSE && (
            <MockResponseForm onSubmit={handleFormSubmit} />
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

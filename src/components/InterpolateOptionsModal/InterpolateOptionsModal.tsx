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
import styles from "./InterpolateOptionsModal.module.scss";
import { useMemo, useState } from "react";
import { HeaderForm } from "../HeaderForm/HeaderForm";
import { UserScriptForm } from "../UserScriptForm/UserScriptForm";
import { RedirectForm } from "../RedirectForm/RedirectForm";
import { ExportForm } from "../Exporter/Exporter";
import { ImportForm } from "../Import/Import";
import { MockResponseForm } from "../MockResponseForm/MockResponseForm";

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
    </Flex>
  );
};

export const InterpolateOptionsModal = ({
  onOpenChange,
  isOpen,
}: {
  onOpenChange: (value: boolean) => void;
  isOpen: boolean;
}) => {
  const [step, setStep] = useState(InterpolationOptionSelection.OPTIONS_VIEW);
  const handleChange = (value: InterpolationOptionSelection) => {
    setStep(value);
  };
  const title = useMemo(() => {
    switch (step) {
      case InterpolationOptionSelection.OPTIONS_VIEW:
        return "What would you like to do?";
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
            className={styles.InterpolateOptionsModal}
            radius="full"
            style={{ width: "250px", backgroundColor: "black" }}
          >
            Create interpolation <PlusCircledIcon />
          </Button>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className={styles.DialogContent} maxWidth={"500px"}>
        <Dialog.Title align="center">
          <Flex align="center" gap="2" justify={"center"}>
            {step !== InterpolationOptionSelection.OPTIONS_VIEW && (
              <ChevronLeftIcon
                onClick={() => {
                  setStep(InterpolationOptionSelection.OPTIONS_VIEW);
                }}
                cursor="pointer"
                height="1rem"
                width="1rem"
              />
            )}
            {title}
          </Flex>
        </Dialog.Title>
        {step === InterpolationOptionSelection.OPTIONS_VIEW && (
          <FormSelectionStep onChange={handleChange} />
        )}
        {step === InterpolationOptionSelection.ADD_HEADERS && (
          <HeaderForm onSubmit={handleFormSubmit} />
        )}
        {step === InterpolationOptionSelection.CREATE_USER_SCRIPT && (
          <UserScriptForm onSubmit={handleFormSubmit} />
        )}
        {step === InterpolationOptionSelection.REDIRECT_REQUEST && (
          <RedirectForm onSubmit={handleFormSubmit} />
        )}
        {step === InterpolationOptionSelection.EXPORT && <ExportForm />}
        {step === InterpolationOptionSelection.IMPORT && <ImportForm />}
        {step === InterpolationOptionSelection.MOCK_RESPONSE && (
          <MockResponseForm onSubmit={handleFormSubmit} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

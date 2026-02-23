import { useEffect, useRef, useState } from "react";

import {
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import {
  Cross1Icon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Strong,
} from "@radix-ui/themes";
import { Collapsible } from "radix-ui";
import { HeaderRulePreview } from "../HeaderPreview/HeaderPreview";
import { RedirectRulePreview } from "../RedirectPreview/RedirectPreview";
import { RuleToggle } from "../RuleToggle/RuleToggle";
import styles from "./InterpolationCard.module.scss";
import { ScriptPreview } from "../ScriptPreview/ScriptPreview";
import { InterpolationOptions } from "../InterpolationOptions/InterpolationOptions";
import { ScriptForm } from "../ScriptForm/ScriptForm.tsx";
import { RedirectForm } from "../RedirectForm/RedirectForm.tsx";
import { HeaderForm } from "../HeaderForm/HeaderForm.tsx";

type InterpolationCardProps = {
  info: RedirectInterpolation | HeaderInterpolation | ScriptInterpolation;
};

export const InterpolationCard = ({
  info,
  hideRuleToggle,
  hideOptions,
}: {
  hideRuleToggle?: boolean;
  hideOptions?: boolean;
} & InterpolationCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { error, type, details, name } = info;
  const { id } = details ?? {};
  const formattedError = error instanceof Error ? error.message : String(error);
  const [enabledByUser, setIsEnabledByUser] = useState(info?.enabledByUser);
  const [editModeEnabled, setEditModeEnabled] = useState<boolean>();
  const [deleteSelected, setDeleteSelected] = useState<boolean>();

  useEffect(() => {
    chrome.storage?.local?.onChanged?.addListener?.((changes) => {
      const isUnrelatedToGlobalPause = !changes?.allPaused;
      if (isUnrelatedToGlobalPause) return;
      const isAllPaused = changes?.allPaused?.newValue === true;
      const isRuleEnabledByUser = !isAllPaused;
      setIsEnabledByUser(isRuleEnabledByUser);
    });
    chrome.storage?.local?.onChanged?.addListener?.((changes) => {
      const recordKey = InterpolateStorage.getInterpolationRecordKey(id);
      const relatedChanges = changes?.[recordKey];
      const isUnrelatedToEnablement = !changes?.[recordKey];

      if (isUnrelatedToEnablement) return;
      const isEnabled = relatedChanges?.newValue?.enabledByUser;

      setIsEnabledByUser(isEnabled);
    });
    chrome.runtime?.onMessage?.addListener?.((message) => {
      const isPauseMessage = message === `interpolation-${id}-paused`;
      const isResumeMesssage = message === `interpolation-${id}-resumed`;
      const isIrrelevant = !isPauseMessage && !isResumeMesssage;

      if (isIrrelevant) return;

      if (isPauseMessage) {
        setIsEnabledByUser(false);
        return;
      }

      if (isResumeMesssage) {
        setIsEnabledByUser(true);
        return;
      }
    });
  }, []);

  const handleResumeClick = async () => {
    await InterpolateStorage.setIsEnabled(details?.id, true);
    setIsEnabledByUser(true);
  };

  const handlePauseClick = async () => {
    await InterpolateStorage.setIsEnabled(details?.id, false);
    setIsEnabledByUser(false);
  };

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
  };

  const badgeColor = () => {
    switch (type) {
      case "headers":
        return "green";
      case "script":
        return "purple";
      case "redirect":
        return "blue";
    }
  };

  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      const elementWidth = ref.current?.clientWidth;
      if (!elementWidth) return;
      if (elementWidth > 300) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  const getPreview = () => {
    switch (type) {
      case "headers":
        return (
          <HeaderRulePreview
            dataOrientation={orientation}
            details={details}
            name={name}
          />
        );
      case "redirect":
        return <RedirectRulePreview name={name} rule={info} />;
      case "script":
        return <ScriptPreview name={name} rule={info} />;
    }
  };

  const getEditForm = () => {
    switch (type) {
      case "redirect":
        return (
          <RedirectForm
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              id,
              matcher: details?.condition?.regexFilter,
              name,
              destination: details?.action?.redirect?.url,
            }}
          />
        );
      case "headers":
        return (
          <HeaderForm
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              id,
              name,
              key: details?.action?.requestHeaders?.[0]?.header ?? "",
              value: details?.action?.requestHeaders?.[0]?.value ?? "",
            }}
          />
        );
      case "script":
        return <ScriptForm />;
      default:
        return <div>something went wrong</div>;
    }
  };

  const onEditSelected = () => {
    setEditModeEnabled(true);
  };

  const onEditModalCloseClick = () => {
    setEditModeEnabled(false);
  };

  const onDeleteSelected = () => {
    setDeleteSelected(true);
  };

  const onDeleteModalCloseClick = () => {
    setDeleteSelected(false);
  };

  const handleDelete = async () => {
    await InterpolateStorage.delete(info.details?.id);
  };
  return (
    <Card
      ref={ref}
      data-ui-error={!!info.error}
      data-testid={`${type}-preview-${info?.name}`}
      className={styles.InterpolationCard}
      variant="surface"
    >
      <Collapsible.Root
        className={styles.CollapsibleRoot}
        onOpenChange={handleOpenChange}
      >
        {error && (
          <Callout.Root color="red">
            <Callout.Text size={"1"}>{formattedError}</Callout.Text>
          </Callout.Root>
        )}
        <Flex width="stretch">
          {hideRuleToggle ? null : (
            <Box width="50px">
              <RuleToggle
                disabled={!!info.error}
                onResumeClick={handleResumeClick}
                onPauseClick={handlePauseClick}
                isPaused={!enabledByUser || !!info.error}
              />
            </Box>
          )}
          <Flex width="100%" direction="column">
            <Flex width="100%" justify="between" align="center" pl="2">
              <Text weight="medium" size="2">
                {name}
              </Text>
              <Flex gap="2" p="2" align="center">
                <Box p="1">
                  <Badge
                    radius="full"
                    variant="solid"
                    color={badgeColor()}
                    size="1"
                  >
                    {type}
                  </Badge>
                </Box>
                {hideOptions ? null : (
                  <InterpolationOptions
                    onEditSelected={onEditSelected}
                    onDeleteSelected={onDeleteSelected}
                    config={info}
                  />
                )}
              </Flex>
            </Flex>
            <Tooltip content="options">
              <Collapsible.Trigger asChild>
                <IconButton
                  className={styles.ToggleCollapse}
                  size="1"
                  radius="none"
                  variant="outline"
                >
                  {isOpen ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />}
                </IconButton>
              </Collapsible.Trigger>
            </Tooltip>
          </Flex>
        </Flex>
        <Collapsible.Content>
          <Box>{getPreview()}</Box>
        </Collapsible.Content>
      </Collapsible.Root>
      <Dialog.Root open={editModeEnabled}>
        <Dialog.Content asChild>
          <Flex direction={"column"} p="0">
            {getEditForm()}
            <Dialog.Close style={{ position: "absolute", right: 5, top: 5 }}>
              <IconButton
                radius="full"
                onClick={onEditModalCloseClick}
                color="red"
              >
                <Cross1Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root open={deleteSelected}>
        <Dialog.Content maxWidth={"500px"}>
          <Dialog.Description>
            <Text size="2">
              Are you sure you want to delete "<Strong>{info.name}</Strong>" ?
            </Text>
          </Dialog.Description>
          <Flex align="end" justify="between">
            <Dialog.Close>
              <Button onClick={onDeleteModalCloseClick} variant="ghost">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleDelete} color="red">
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Card>
  );
};

import { useEffect, useMemo, useRef, useState } from "react";

import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { ChevronUpIcon } from "@radix-ui/react-icons";
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
  Strong,
  Separator,
} from "@radix-ui/themes";
import { Collapsible, ContextMenu } from "radix-ui";
import { HeaderRulePreview } from "../HeaderPreview/HeaderPreview";
import { RedirectRulePreview } from "../RedirectPreview/RedirectPreview";
import { RuleToggle } from "../RuleToggle/RuleToggle";
import { ScriptPreview } from "../ScriptPreview/ScriptPreview";
import { InterpolationOptions } from "../InterpolationOptions/InterpolationOptions";
import { UserScriptForm } from "../UserScriptForm/UserScriptForm.tsx";
import { RedirectForm } from "../RedirectForm/RedirectForm.tsx";
import { AddHeaderForm } from "../AddHeaderForm/AddHeaderForm.tsx";
import { MockPreview } from "../MockPreview/MockPreview.tsx";
import { MockResponseForm } from "../MockResponseForm/MockResponseForm.tsx";
import styles from "./InterpolationCard.module.scss";
import { TabManagerPreview } from "../TabManagerPreview/TabManagerPreview.tsx";
import { TabManagementForm } from "../TabManagementForm/TabManagementForm.tsx";

type InterpolationCardProps = {
  info: AnyInterpolation;
};

export const InterpolationCard = ({
  info,
  hideRuleToggle,
  hideOptions,
}: {
  hideRuleToggle?: boolean;
  hideOptions?: boolean;
} & InterpolationCardProps) => {
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

  const badgeColor = useMemo(() => {
    switch (type) {
      case "tab-manager":
        return "orange";
      case "mockAPI":
        return "yellow";
      case "headers":
        return "green";
      case "script":
        return "purple";
      case "redirect":
        return "blue";
    }
  }, [type]);

  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getPreview = () => {
    switch (type) {
      case "headers":
        return <HeaderRulePreview details={details} />;
      case "redirect":
        return <RedirectRulePreview name={name} rule={info} />;
      case "mockAPI":
        return <MockPreview details={details} />;
      case "script":
        return <ScriptPreview rule={info} />;
      case "tab-manager":
        return (
          <TabManagerPreview
            regex={info.details.matcher}
            tabGroupName={info.name}
          />
        );
    }
  };

  const onCancelEdit = () => {
    setEditModeEnabled(false);
  };
  const getEditForm = () => {
    switch (type) {
      case "redirect":
        return (
          <RedirectForm
            mode="edit"
            onCancelEdit={onCancelEdit}
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              id,
              matcher: details?.regexFilter,
              name,
              destination: details?.destination,
            }}
          />
        );
      case "headers":
        return (
          <AddHeaderForm
            mode="edit"
            onCancelEdit={onCancelEdit}
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              id,
              name,
              key: details?.headerKey,
              value: details?.headerValue,
            }}
          />
        );
      case "script":
        return (
          <UserScriptForm
            mode="edit"
            onCancelEdit={onCancelEdit}
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              name: info.name,
              id: info.details?.id,
              runAt: info.details?.runAt ?? "document_start",
              script: info.details?.js[0]?.code,
            }}
          />
        );
      case "tab-manager":
        return (
          <TabManagementForm
            mode="edit"
            onCancelEdit={onCancelEdit}
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              interpName: info?.name,
              id: info.details?.id,
              groupId: String(info.details?.groupId),
              regex: info.details?.matcher,
            }}
          />
        );

      case "mockAPI":
        return (
          <MockResponseForm
            onSubmit={() => setEditModeEnabled(false)}
            defaultValues={{
              ...info.details,
              name,
            }}
          />
        );
      default:
        return <div>something went wrong</div>;
    }
  };

  const onEditSelected = () => {
    setEditModeEnabled(true);
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
    <Collapsible.Root
      style={{ width: "stretch" }}
      onOpenChange={setIsExpanded}
      open={isExpanded}
      asChild
    >
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Card
            ref={ref}
            data-ui-error={!!info.error}
            data-testid={`${type}-preview-${info?.name}`}
            className={styles.InterpolationCard}
            variant="surface"
            style={{ width: "stretch" }}
          >
            {error && (
              <Callout.Root color="red">
                <Callout.Text size={"1"}>{formattedError}</Callout.Text>
              </Callout.Root>
            )}
            <Flex width="stretch" gap="2" direction="column" maxWidth="100%">
              <Flex justify={"between"} align="center" flexGrow={"grow"}>
                <Flex direction="column" width="stretch" justify={"between"}>
                  <Flex
                    width="stretch"
                    justify={"between"}
                    align="center"
                    p="2"
                  >
                    <Flex justify={"start"} align="center" gap="2" width="100%">
                      <Badge size="1" color={badgeColor}>
                        <Strong>
                          <Text align="center" weight="medium" size="1">
                            {info.type}
                          </Text>
                        </Strong>
                      </Badge>

                      <Flex maxWidth="150px">
                        <Text size="2">{info.name}</Text>
                      </Flex>
                    </Flex>
                    <Flex gap="3">
                      {hideRuleToggle ? null : (
                        <Box width="50px">
                          <RuleToggle
                            disabled={!!info.error}
                            onResumeClick={handleResumeClick}
                            onPauseClick={handlePauseClick}
                            isPaused={!enabledByUser || !!info.error}
                          />
                        </Box>
                      )}{" "}
                      <Collapsible.Trigger>
                        <Flex justify={"center"} gap="2">
                          <IconButton
                            data-open={isExpanded}
                            type="button"
                            className={styles.ExpansionTrigger}
                            radius="full"
                            size="1"
                            variant="ghost"
                          >
                            <ChevronUpIcon />
                          </IconButton>
                        </Flex>
                      </Collapsible.Trigger>
                    </Flex>
                  </Flex>

                  {isExpanded && <Separator size="4" />}
                </Flex>
              </Flex>

              <Collapsible.Content>
                <Flex width="stretch" justify={"between"} px="2" pb="2">
                  <Flex maxWidth={"80%"} overflow={"hidden"}>
                    {getPreview()}
                  </Flex>
                </Flex>
              </Collapsible.Content>
            </Flex>

            <Dialog.Root open={editModeEnabled}>
              <Dialog.Content asChild>
                <Flex direction={"column"}>{getEditForm()}</Flex>
              </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root open={deleteSelected}>
              <Dialog.Content maxWidth={"500px"}>
                <Dialog.Description>
                  <Text size="2">
                    Are you sure you want to delete "
                    <Strong>{info.name}</Strong>" ?
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
            {hideOptions ? null : (
              <InterpolationOptions
                onDeleteSelected={onDeleteSelected}
                onEditSelected={onEditSelected}
                config={info}
              />
            )}
          </Card>
        </ContextMenu.Trigger>
      </ContextMenu.Root>
    </Collapsible.Root>
  );
};

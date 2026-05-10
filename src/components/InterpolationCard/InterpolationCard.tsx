import { useEffect, useMemo, useRef, useState } from "react";

import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import {
  CardStackIcon,
  CardStackPlusIcon,
  Cross1Icon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  Link1Icon,
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
  Separator,
} from "@radix-ui/themes";
import { Collapsible } from "radix-ui";
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
      case "mockAPI":
        return (
          <MockPreview
            name={name}
            dataOrientation={orientation}
            details={details}
          />
        );
      case "script":
        return <ScriptPreview name={name} rule={info} />;
      case "tab-manager":
        return (
          <TabManagerPreview
            regex={info.details.matcher}
            tabGroupName={info.name}
          />
        );
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
              matcher: details?.regexFilter,
              name,
              destination: details?.destination,
            }}
          />
        );
      case "headers":
        return (
          <AddHeaderForm
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
  console.log({ info });
  return (
    <Card
      ref={ref}
      data-ui-error={!!info.error}
      data-testid={`${type}-preview-${info?.name}`}
      className={styles.InterpolationCard}
      variant="surface"
    >
      {error && (
        <Callout.Root color="red">
          <Callout.Text size={"1"}>{formattedError}</Callout.Text>
        </Callout.Root>
      )}
      <Flex width="stretch" gap="2" direction="column" maxWidth="100%">
        <Flex
          style={{ backgroundColor: "var(--theme-choice-background)" }}
          justify={"between"}
          align="center"
          flexGrow={"grow"}
        >
          <Flex direction="column" width="stretch">
            <Flex width="stretch" justify={"between"} p="2">
              <Flex justify={"center"} align="center" gap="2">
                <Badge size="1" color={badgeColor}>
                  <Strong>
                    <Text align="center" weight="medium" size="2">
                      {name}
                    </Text>
                  </Strong>
                </Badge>
              </Flex>
              {/* {hideOptions ? null : ( */}
              {/*   <Box> */}
              {/*     <InterpolationOptions */}
              {/*       onEditSelected={onEditSelected} */}
              {/*       onDeleteSelected={onDeleteSelected} */}
              {/*       config={info} */}
              {/*     /> */}
              {/*   </Box> */}
              {/* )} */}
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
            </Flex>

            <Separator size="4" />
          </Flex>
        </Flex>

        <Flex width="stretch" justify={"between"} px="2" pb="2">
          <Flex maxWidth={"80%"} overflow={"hidden"}>
            {getPreview()}
          </Flex>
        </Flex>
      </Flex>

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

import { useEffect, useRef, useState } from "react";

import {
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
  InterpolationType,
} from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  DotsHorizontalIcon,
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
  Separator,
} from "@radix-ui/themes";
import { Collapsible } from "radix-ui";
import { HeaderRulePreview } from "../HeaderPreview/HeaderPreview";
import { RedirectRulePreview } from "../RedirectPreview/RedirectPreview";
import { RuleDeleteAction } from "../RuleDeleteAction/RuleDeleteAction";
import { RuleToggle } from "../RuleToggle/RuleToggle";
import styles from "./InterpolationCard.module.scss";
import { ScriptPreview } from "../ScriptPreview/ScriptPreview";
import { InterpolationOptions } from "../InterpolationOptions/InterpolationOptions";
import { EditRedirectForm } from "../EditRedirectForm/EditRedirectForm.tsx";
import { EditHeaderForm } from "../EditHeaderForm/EditHeaderForm.tsx";
import { ScriptForm } from "../ScriptForm/ScriptForm.tsx";
import { useInterpolationForm } from "../../hooks/useInterpolationForm/useInterpolationForm.ts";

type InterpolationCardProps = {
  info: RedirectInterpolation | HeaderInterpolation | ScriptInterpolation;
};

export const InterpolationCard = ({
  info,
  hideRuleToggle,
}: { hideRuleToggle?: boolean } & InterpolationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hit, setHit] = useState(false);
  const [_, setRecentlyHitColor] = useState<"green" | "gray">("green");
  const { enabledByUser, error, type, details, name } = info;
  const { id } = details ?? {};
  const formattedError = error instanceof Error ? error.message : String(error);
  const [editModeEnabled, setEditModeEnabled] = useState();
  const form = useInterpolationForm();

  useEffect(() => {
    chrome.runtime?.onMessage?.addListener?.((msg) => {
      if (msg === `redirect-${details.id}-hit`) {
        setRecentlyHitColor("green");
        setHit(true);
        setTimeout(() => {
          setRecentlyHitColor("gray");
        }, 5000);
        setTimeout(() => {
          setHit(false);
        }, 30000);
      }
    });
  }, [enabledByUser]);

  const onDelete = async () => {
    await InterpolateStorage.delete(details.id);
  };

  const handleResumeClick = async () => {
    await InterpolateStorage.setIsEnabled(details?.id, true);
  };

  const handlePauseClick = async () => {
    await InterpolateStorage.setIsEnabled(details?.id, false);
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
          <EditRedirectForm
            onSuccess={() => setEditModeEnabled(false)}
            defaultValues={{
              id,
              source: details?.condition?.regexFilter,
              name,
              destination: details?.action?.redirect?.url,
            }}
          />
        );
      case "headers":
        return (
          <EditHeaderForm
            onSuccess={() => setEditModeEnabled(false)}
            defaultValues={{
              id,
              name,
              key: details?.action?.requestHeaders?.[0]?.header,
              value: details?.action?.requestHeaders?.[0]?.value,
            }}
          />
        );
      case "scripts":
        return <ScriptForm editModeEnabled form={form} />;
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

  const onEditModalSaveClick = () => {
    setEditModeEnabled(false);
  };
  return (
    <Card
      ref={ref}
      data-ui-active={hit}
      data-ui-error={!!info.error}
      data-testid={`${type}-preview-${info?.details?.id}`}
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
                  <Badge variant="soft" color={badgeColor()} size="1">
                    {type}
                  </Badge>
                </Box>
                <InterpolationOptions
                  onEditSelected={onEditSelected}
                  config={info}
                />
              </Flex>
            </Flex>
            <Tooltip content="options">
              <Collapsible.Trigger asChild>
                <IconButton
                  className={styles.ToggleCollapse}
                  boxShadow="none"
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
        <Dialog.Content>
          {getEditForm()}
          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button onClick={onEditModalCloseClick} color="red">
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Card>
  );
};

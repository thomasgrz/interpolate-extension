import { useEffect, useRef, useState } from "react";

import {
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Card,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { Collapsible } from "radix-ui";
import { HeaderRulePreview } from "../HeaderPreview/HeaderPreview";
import { RedirectRulePreview } from "../RedirectPreview/RedirectPreview";
import { RuleDeleteAction } from "../RuleDeleteAction/RuleDeleteAction";
import { RuleToggle } from "../RuleToggle/RuleToggle";
import styles from "./InterpolationCard.module.scss";
import { ScriptPreview } from "../ScriptPreview/ScriptPreview";

type InterpolationCardProps = {
  info: RedirectInterpolation | HeaderInterpolation | ScriptInterpolation;
};

export const InterpolationCard = ({ info }: InterpolationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hit, setHit] = useState(false);
  const [_, setRecentlyHitColor] = useState<"green" | "gray">("green");
  const { enabledByUser } = info;

  useEffect(() => {
    chrome.runtime?.onMessage?.addListener?.((msg) => {
      if (msg === `redirect-${info.details.id}-hit`) {
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
    await InterpolateStorage.delete(info.details.id);
  };

  const handleResumeClick = async () => {
    await InterpolateStorage.setIsEnabled(info.details?.id, true);
  };

  const handlePauseClick = async () => {
    await InterpolateStorage.setIsEnabled(info.details?.id, false);
  };

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
  };

  const badgeColor = () => {
    switch (info.type) {
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
    switch (info.type) {
      case "headers":
        return (
          <HeaderRulePreview
            dataOrientation={orientation}
            details={info.details}
            name={info.name}
          />
        );
      case "redirect":
        return <RedirectRulePreview name={info.name} rule={info} />;
      case "script":
        return <ScriptPreview name={info.name} rule={info} />;
    }
  };

  return (
    <Collapsible.Root onOpenChange={handleOpenChange}>
      <Card
        ref={ref}
        data-ui-active={hit}
        data-ui-error={!!info.error}
        data-testid={`${info.type}-preview-${info?.details?.id}`}
        className={styles.InterpolationCard}
        variant="surface"
      >
        <Flex justify="between" align="center">
          <RuleToggle
            disabled={!!info.error}
            onResumeClick={handleResumeClick}
            onPauseClick={handlePauseClick}
            isPaused={!enabledByUser || !!info.error}
          />
          <Collapsible.Trigger asChild>
            <Flex px="1" flexGrow="1" justify={"between"}>
              <Flex p="3" align={"center"}>
                <Text weight="medium" size="2">
                  {info.name}
                </Text>
              </Flex>
              <Flex align={"center"}>
                <Box p="1">
                  <Badge variant="soft" color={badgeColor()} size="1">
                    {info.type}
                  </Badge>
                </Box>
                <Tooltip content="options">
                  <IconButton size="1" radius="full" variant="outline">
                    {isOpen ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />}
                  </IconButton>
                </Tooltip>
              </Flex>
            </Flex>
          </Collapsible.Trigger>
        </Flex>
        <Collapsible.Content>
          <Flex align={"end"} justify={"between"}>
            <Flex flexGrow={"1"}>{getPreview()}</Flex>
            <Box>
              <RuleDeleteAction onDelete={onDelete} />
            </Box>
          </Flex>
        </Collapsible.Content>
      </Card>
    </Collapsible.Root>
  );
};

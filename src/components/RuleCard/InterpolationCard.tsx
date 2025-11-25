import { useEffect, useState } from "react";

import {
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  DataList,
  Flex,
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
  const [isPaused, setIsPaused] = useState(!info.enabledByUser);
  const [isOpen, setIsOpen] = useState(false);
  const [hit, setHit] = useState(false);
  const [recentlyHitColor, setRecentlyHitColor] = useState<"green" | "gray">(
    "green",
  );

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
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
  }, [isPaused]);

  useEffect(() => {
    InterpolateStorage.subscribeToChanges(async (values) => {
      const parentConfig = [
        ...values.headers,
        ...values.redirects,
        ...values.scripts,
      ].find((value) => value.details.id === info.details.id);
      const isParentConfigPaused = parentConfig?.enabledByUser === false;

      setIsPaused(isParentConfigPaused);
    });
  }, []);

  const onDelete = async () => {
    await InterpolateStorage.delete(info);
  };

  const handleResumeClick = async () => {
    await InterpolateStorage.setIsEnabled(info, true);
  };

  const handlePauseClick = async () => {
    await InterpolateStorage.setIsEnabled(info, false);
  };

  const collapseTriggerContent = isOpen ? "collapse" : "expand";

  const getPreview = () => {
    switch (info.type) {
      case "headers":
        // @ts-expect-error testing
        return <HeaderRulePreview details={info} name={info.name} />;
      case "redirect":
        return <RedirectRulePreview rule={info} />;
      case "script":
        return <ScriptPreview rule={info} />;
    }
  };
  return (
    <Card
      data-ui-active={hit}
      data-ui-error={!!info.error}
      className={styles.InterpolationCard}
    >
      <Collapsible.Root onOpenChange={setIsOpen} open={isOpen}>
        <Flex justify={"between"} flexGrow="2">
          <Box>
            <Flex>{getPreview()}</Flex>
            <Flex py="1">
              {hit && !info.error && (
                <Badge color={recentlyHitColor}>Recently hit</Badge>
              )}
              {info.error && (
                <>
                  <Tooltip content={info.error}>
                    <Badge color="ruby">
                      Error
                      <QuestionMarkCircledIcon />
                    </Badge>
                  </Tooltip>
                </>
              )}
            </Flex>
          </Box>
          <Flex direction={"column"} gap="3" className={styles.DeleteAction}>
            <RuleDeleteAction onDelete={onDelete} />
            <RuleToggle
              disabled={!!info.error}
              onResumeClick={handleResumeClick}
              onPauseClick={handlePauseClick}
              isPaused={isPaused || !!info.error}
            />
          </Flex>
        </Flex>
      </Collapsible.Root>
    </Card>
  );
};

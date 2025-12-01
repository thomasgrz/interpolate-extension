import { useEffect, useState } from "react";

import {
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Badge, Box, Card, Flex, Tooltip } from "@radix-ui/themes";
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
  const [recentlyHitColor, setRecentlyHitColor] = useState<"green" | "gray">(
    "green",
  );
  const { enabledByUser } = info;

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

  const getPreview = () => {
    switch (info.type) {
      case "headers":
        // @ts-expect-error testing
        return <HeaderRulePreview details={info.details} name={info.name} />;
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
          <Flex
            direction={"column"}
            justify="between"
            align={"center"}
            className={styles.DeleteAction}
          >
            <RuleToggle
              disabled={!!info.error}
              onResumeClick={handleResumeClick}
              onPauseClick={handlePauseClick}
              isPaused={!enabledByUser || !!info.error}
            />
            <RuleDeleteAction onDelete={onDelete} />
          </Flex>
        </Flex>
      </Collapsible.Root>
    </Card>
  );
};

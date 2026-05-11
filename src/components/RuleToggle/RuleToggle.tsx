import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import styles from "./RuleToggle.module.scss";
import { Switch } from "radix-ui";

export const RuleToggle = ({
  isPaused,
  onPauseClick,
  onResumeClick,
}: {
  disabled?: boolean;
  isPaused: boolean;
  onPauseClick: () => void;
  onResumeClick: () => void;
}) => {
  const handleClick = isPaused ? onResumeClick : onPauseClick;
  return (
    <Flex
      style={{
        // @ts-expect-error TODO: fix types
        "--switch-background": !isPaused ? "var(--lime-9)" : "var(--gray-5)",
      }}
      justify={"center"}
      align="center"
      gap="2"
      data-testid={`${isPaused ? "play" : "pause"}-rule-toggle`}
    >
      <Switch.Root
        checked={!isPaused}
        defaultChecked={!isPaused}
        onCheckedChange={handleClick}
        className={styles.SwitchRoot}
        style={{
          boxShadow: "var(--shadow-1)",
        }}
      >
        <Flex align={"center"} justify={"between"}>
          <Flex px="1">
            <PlayIcon />
          </Flex>
          <Switch.Thumb
            defaultChecked={!isPaused}
            className={styles.SwitchThumb}
          />
          <Flex px="1">
            <PauseIcon />
          </Flex>
        </Flex>
      </Switch.Root>
    </Flex>
  );
};

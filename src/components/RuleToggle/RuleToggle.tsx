import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Flex, Button, IconButton, Tooltip } from "@radix-ui/themes";
import styles from "./RuleToggle.module.scss";

export const RuleToggle = ({
  isPaused,
  onPauseClick,
  onResumeClick,
  disabled,
}: {
  disabled?: boolean;
  isPaused: boolean;
  onPauseClick: () => void;
  onResumeClick: () => void;
}) => {
  const handleClick = isPaused ? onPauseClick : onResumeClick;
  const buttonColor = isPaused ? "green" : "blue";
  return (
    <Flex
      className={styles.RuleToggle}
      height="stretch"
      align="center"
      data-testid={`${isPaused ? "play" : "pause"}-rule-toggle`}
    >
      <IconButton
        height="stretch"
        radius="none"
        onClick={handleClick}
        color={buttonColor}
      >
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </IconButton>
    </Flex>
  );
};

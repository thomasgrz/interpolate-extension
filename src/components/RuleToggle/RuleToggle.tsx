import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import styles from "./RuleToggle.module.scss";

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
  const buttonColor = isPaused ? "green" : "blue";
  return (
    <Flex
      className={styles.RuleToggle}
      height="stretch"
      align="center"
      data-testid={`${isPaused ? "play" : "pause"}-rule-toggle`}
    >
      <IconButton radius="none" onClick={handleClick} color={buttonColor}>
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </IconButton>
    </Flex>
  );
};

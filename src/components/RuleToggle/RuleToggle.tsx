import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Box, IconButton, Tooltip } from "@radix-ui/themes";

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
  return (
    <Box data-testid={`${isPaused ? "play" : "pause"}-rule-toggle`}>
      {isPaused ? (
        <Tooltip
          content={disabled ? "rule cannot be enabled due to error" : "resume"}
        >
          <IconButton
            radius="full"
            disabled={disabled}
            onClick={onResumeClick}
            color="green"
          >
            <PlayIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip content="pause">
          <IconButton disabled={disabled} onClick={onPauseClick} color={"blue"}>
            <PauseIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

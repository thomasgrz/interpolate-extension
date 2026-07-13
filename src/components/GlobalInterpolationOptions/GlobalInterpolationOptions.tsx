import { IconButton, Tooltip } from "@radix-ui/themes";
import styles from "./GlobalInterpolationOptions.module.scss";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { ResumeIcon, StopIcon } from "@radix-ui/react-icons";

export const GlobalInterpolationOptions = ({
  onChange,
}: {
  onChange: (_value: boolean) => void;
}) => {
  const { isExtensionEnabled, disableExtension, enableExtension } =
    useInterpolationsContext();

  const isExtensionDisabled = !isExtensionEnabled;

  const handleDisableExtension = () => {
    disableExtension();
    onChange(false);
  };
  return isExtensionDisabled ? (
    <Tooltip content="Enable interpolate extension in browser">
      <IconButton
        variant="solid"
        radius="full"
        type="button"
        data-testid="resume-all"
        className={styles.ResumeAllRules}
        color="green"
        onClick={enableExtension}
      >
        <ResumeIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip content="Disable interpolate extension in browser">
      <IconButton
        variant="solid"
        radius="full"
        type="button"
        data-testid="pause-all"
        className={styles.PauseAllRules}
        color="red"
        onClick={handleDisableExtension}
      >
        <StopIcon />
      </IconButton>
    </Tooltip>
  );
};

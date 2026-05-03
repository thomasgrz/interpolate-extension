import { IconButton } from "@radix-ui/themes";
import Pause from "../../assets/pause.svg";
import Play from "../../assets/play.svg";
import styles from "./GlobalInterpolationOptions.module.scss";
import { useMemo } from "react";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";

export const GlobalInterpolationOptions = ({
  allowDelete = true,
}: {
  allowDelete?: boolean;
}) => {
  const { interpolations, allPaused, removeAll, pauseAll, resumeAll } =
    useInterpolationsContext();

  const ruleCount = useMemo(() => interpolations?.length, [interpolations]);

  return allPaused ? (
    <IconButton
      variant="solid"
      radius="full"
      type="button"
      disabled={!ruleCount}
      className={styles.ResumeAllRules}
      color="green"
      onClick={resumeAll}
    >
      <Play />
    </IconButton>
  ) : (
    <IconButton
      variant="solid"
      radius="full"
      type="button"
      disabled={!ruleCount}
      className={styles.PauseAllRules}
      color="blue"
      onClick={pauseAll}
    >
      <Pause />
    </IconButton>
  );
};

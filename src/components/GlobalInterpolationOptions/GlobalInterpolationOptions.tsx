import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Box, Button, Flex } from "@radix-ui/themes";
import Pause from "../../assets/pause.svg";
import Play from "../../assets/play.svg";
import styles from "./GlobalInterpolationOptions.module.scss";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { useInterpolations } from "#src/hooks/useInterpolations/useInterpolations.ts";
import { useMemo } from "react";

const Count = (props: { count?: number }) =>
  props.count ? <span>({props.count})</span> : null;

export const GlobalInterpolationOptions = ({
  allowDelete = true,
}: {
  allowDelete?: boolean;
}) => {
  const { interpolations, allPaused, removeAll, pauseAll, resumeAll } =
    useInterpolations();

  const ruleCount = useMemo(() => interpolations.length, [interpolations]);

  return (
    <Box p="1">
      <Flex justify={"between"} flexGrow={"1"} width="100%">
        {allPaused ? (
          <Button
            radius="full"
            type="button"
            disabled={!ruleCount}
            size={"2"}
            className={styles.ResumeAllRules}
            color="green"
            onClick={resumeAll}
          >
            <Play />
            Resume
            <Count count={ruleCount} />
          </Button>
        ) : (
          <Button
            radius="full"
            type="button"
            disabled={!ruleCount}
            size={"2"}
            className={styles.PauseAllRules}
            color="blue"
            onClick={pauseAll}
          >
            <Pause />
            Pause
            <Count count={ruleCount} />
          </Button>
        )}
        {/* <Button
          className={styles.SyncAllRules}
          size={"3"}
          onClick={onSyncAllRules}
        >
          <Refresh />
          Sync
        </Button> */}
        {allowDelete && (
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button
                disabled={!ruleCount}
                size={"2"}
                className={styles.DeleteAllRules}
                color="red"
              >
                <TrashIcon />
                Delete
                <Count count={ruleCount} />
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Delete all rules forever?</AlertDialog.Title>
              <AlertDialog.Description>
                You can also just pause all rules
              </AlertDialog.Description>
              <Flex p="3" justify={"between"}>
                <AlertDialog.Cancel>
                  <Button radius="small" variant="soft" color="gray">
                    Exit
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action onClick={removeAll}>
                  <Button onClick={removeAll} radius="small" color="red">
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        )}
      </Flex>
    </Box>
  );
};

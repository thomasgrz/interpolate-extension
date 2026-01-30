import { React, useState } from "react";
import {
  Button,
  Dialog,
  Badge,
  Checkbox,
  Flex,
  Strong,
} from "@radix-ui/themes";
import { UploadIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./Exporter.module.scss";

export const Exporter = ({
  interpolations,
  disabled,
}: {
  disabled: boolean;
  interpolations: AnyInterpolation[];
}) => {
  const [selectedStates, setSelectedStates] = useState({});
  const [copied, setCopied] = useState(false);
  const numOfSelected = Object.values(selectedStates)?.filter(
    ({ isChecked }) => isChecked,
  ).length;
  const handleChange = (e: React.SyntheticEvent, interp) => {
    const isCheckedAfterChange = e?.target?.ariaChecked === "false";
    setSelectedStates((prev) => {
      return {
        ...prev,
        [interp?.details?.id]: {
          isChecked: isCheckedAfterChange,
          ...interp,
        },
      };
    });
  };
  const handleCopySelected = () => {
    const selected = Object.values(selectedStates)
      .filter(({ isChecked, ...interp }) => isChecked && interp)
      .map(({ isChecked, ...interp }) => interp);
    const json = JSON.stringify(selected);
    const data = [new ClipboardItem({ "text/plain": json })];

    navigator.clipboard.write(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button disabled={disabled}>
          Export <UploadIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className={styles.DialogContent}>
        <Flex p="2" align="center" justify={copied ? "between" : "end"}>
          {copied && <Badge color="green">{numOfSelected} copied</Badge>}
          <Button onClick={handleCopySelected}>
            Copy ({numOfSelected})
            <ClipboardCopyIcon />
          </Button>
        </Flex>
        <Flex gap="2" direction="column">
          {interpolations?.map?.((interp) => {
            return (
              <Flex gap="2" align="center">
                <Checkbox
                  key={interp?.details?.id}
                  onClick={(e) => handleChange(e, interp)}
                />
                <InterpolationCard hideRuleToggle info={interp} />{" "}
              </Flex>
            );
          })}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

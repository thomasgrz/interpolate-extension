import { useState } from "react";
import { Button, Dialog, Badge, Checkbox, Flex } from "@radix-ui/themes";
import { UploadIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import styles from "./Exporter.module.scss";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";

export const Exporter = ({
  interpolations,
  disabled,
}: {
  disabled: boolean;
  interpolations: AnyInterpolation[];
}) => {
  const [selectedStates, setSelectedStates] = useState<
    Record<string, { isChecked: boolean } & AnyInterpolation>
  >({});
  const [copied, setCopied] = useState(false);
  const numOfSelected = Object.values(selectedStates)?.filter(
    ({ isChecked }) => isChecked,
  ).length;
  const handleChange = (e: MouseEvent, interp: AnyInterpolation) => {
    // @ts-expect-error TODO: fix types
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
      <Dialog.Trigger>
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
              <Flex width="stretch" flexGrow="1" gap="2" align="center">
                <Checkbox
                  key={interp?.details?.id}
                  // @ts-expect-error TODO: fix types
                  onClick={(e) => handleChange(e, interp)}
                />
                <InterpolationCard hideRuleToggle info={interp} />
              </Flex>
            );
          })}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

import { ChangeEvent, useMemo, useState } from "react";
import {
  Button,
  Badge,
  Card,
  Checkbox,
  Flex,
  Text,
  Box,
  ScrollArea,
} from "@radix-ui/themes";
import { ClipboardCopyIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard.tsx";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { useInterpolations } from "#src/hooks/useInterpolations/useInterpolations.ts";
import {
  SortingOptions,
  SortOption,
} from "../SortingOptions/SortingOptions.tsx";
import { sortInterpolations } from "#src/utils/sortInterpolations.ts";
import { Label } from "radix-ui";
import { TextInput } from "../TextInput/TextInput.tsx";

export const ExportInterpolations = () => {
  const [selectedStates, setSelectedStates] = useState<
    Record<string, { isChecked: boolean } & AnyInterpolation>
  >({});
  const [copied, setCopied] = useState(false);
  const numOfSelected = Object.values(selectedStates)?.filter(
    ({ isChecked }) => isChecked,
  ).length;
  const [query, setQuery] = useState("");

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
  const { interpolations } = useInterpolations();
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NEWEST);
  const sortedOptions = useMemo(() => {
    return sortInterpolations(interpolations, sortOption);
  }, [sortOption, interpolations]);
  const filteredSorted = sortedOptions?.filter((interp) =>
    interp?.name?.toLowerCase()?.includes(query),
  );
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box>
      <Flex p="2" direction="column" align="start" justify={"between"}>
        <Flex width="stretch">
          <Label.Root>
            <Text size="1">Sort by: </Text>
          </Label.Root>
          <SortingOptions value={sortOption} onChange={setSortOption} />
        </Flex>
        <Flex
          width="stretch"
          direction={"column"}
          p="1"
          align={"start"}
          justify={"start"}
        >
          <TextInput
            size="1"
            style={{ maxWidth: "300px" }}
            value={query}
            placeholder="Filter by keyword..."
            onChange={handleQueryChange}
            icon={<MagnifyingGlassIcon />}
          />
          <Flex width="stretch" justify="center">
            {query && (
              <Text size="1">
                showing {`${filteredSorted?.length}`}{" "}
                {filteredSorted?.length === 1 ? "match" : "matches"} for{" "}
                {`"${query}"`}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Box minHeight={"150px"}>
        <ScrollArea style={{ maxHeight: "50dvh" }}>
          <Flex pt="2" gap="2" direction="column">
            {filteredSorted?.map?.((interp) => {
              return (
                <Flex
                  key={interp?.details?.id}
                  width="stretch"
                  flexGrow="1"
                  gap="2"
                  align="center"
                >
                  <Checkbox
                    // @ts-expect-error TODO: fix types
                    onClick={(e) => handleChange(e, interp)}
                  />
                  <InterpolationCard hideRuleToggle info={interp} />
                </Flex>
              );
            })}
          </Flex>
        </ScrollArea>
      </Box>

      <Flex width="stretch" justify={"between"} align="center" pt={"3"}>
        {copied ? (
          <Badge color="green">{numOfSelected} copied</Badge>
        ) : (
          <Text size="1">{numOfSelected} selected</Text>
        )}
        <Button size="2" onClick={handleCopySelected}>
          Copy ({numOfSelected})
          <ClipboardCopyIcon />
        </Button>
      </Flex>
    </Box>
  );
};

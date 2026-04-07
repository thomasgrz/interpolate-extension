import { Callout, Container, Flex, Tabs, Text, Strong } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./DashboardView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useMemo, useState } from "react";
import { TextInput } from "../TextInput/TextInput.tsx";
import {
  SortingOptions,
  SortOption,
} from "../SortingOptions/SortingOptions.tsx";
import { Label } from "radix-ui";
import { sortInterpolations } from "#src/utils/sortInterpolations.ts";

export const DashboardView = () => {
  const { interpolations, recentlyActive } = useInterpolationsContext();
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NEWEST);
  const [selectedTab, setSelectedTab] = useState("all");
  const [filter, setFilter] = useState("");
  const sortedInterpolations = useMemo(() => {
    return sortInterpolations(interpolations!, sortOption);
  }, [sortOption, interpolations]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const parsedFilterValue = useMemo(() => filter?.trim(), [filter]);
  const filteredSortedOptions = useMemo(
    () =>
      sortedInterpolations?.filter((interp) =>
        interp?.name?.toLowerCase()?.includes(filter?.toLowerCase()),
      ),
    [filter],
  );
  const enabledInterpolations = useMemo(
    () => interpolations?.filter((interp) => interp?.enabledByUser),
    [sortedInterpolations],
  );

  return (
    <ErrorBoundary
      onError={console.error}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          Something went wrong
        </Callout.Root>
      }
    >
      <Container pb="50px" className={styles.Container} minHeight={"100dvh"}>
        <Flex
          p="0"
          minHeight={"100dvh"}
          flexGrow={"1"}
          justify={"start"}
          direction={"column"}
        >
          <Tabs.Root
            value={selectedTab}
            onValueChange={setSelectedTab}
            className={styles.TabsRoot}
            defaultValue="all"
          >
            <Flex
              direction="column"
              className={styles.DashboardControls}
              align={"center"}
              justify="center"
            >
              <ControlCenter />
              <Tabs.List>
                <Flex
                  className={styles.Tabs}
                  justify={"between"}
                  align={"center"}
                >
                  <Tabs.Trigger value="all">
                    <Text size="1">All ({interpolations?.length})</Text>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="enabled">
                    <Text size="1">
                      Enabled ({enabledInterpolations?.length})
                    </Text>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="active">
                    <Text size="1">
                      Invoked ({recentlyActive?.length ?? 0})
                    </Text>
                  </Tabs.Trigger>
                </Flex>
              </Tabs.List>
              {selectedTab === "all" && (
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
                    value={filter}
                    placeholder="Filter by keyword..."
                    onChange={handleFilterChange}
                    icon={<MagnifyingGlassIcon />}
                  />
                  <Flex>
                    <Label.Root>
                      <Text size="1">Sort:</Text>
                    </Label.Root>
                    <SortingOptions
                      value={sortOption}
                      onChange={setSortOption}
                    />
                  </Flex>
                </Flex>
              )}
            </Flex>
            {!!parsedFilterValue && selectedTab === "all" && (
              <Text size="1">
                {filteredSortedOptions?.length}{" "}
                {filteredSortedOptions?.length === 1 ? "match" : "matches"} for
                "{filter}"
              </Text>
            )}
            <Tabs.Content value="all">
              <InterpolationsListView
                configs={filter ? filteredSortedOptions : sortedInterpolations}
              />
            </Tabs.Content>
            <Tabs.Content value="enabled">
              <Callout.Root color="gray" m="1" variant="soft" size="1">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text size="1">
                  These are the interpolations you have <Strong>enabled</Strong>
                </Callout.Text>
              </Callout.Root>

              <InterpolationsListView
                hideRuleToggle
                configs={enabledInterpolations}
              />
            </Tabs.Content>
            <Tabs.Content value="active">
              <Callout.Root color="gray" m="1" variant="soft" size="1">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text size="1">
                  These interpolations have been <Strong>invoked</Strong> within
                  this tab <Strong>since the last page load.</Strong>
                </Callout.Text>
              </Callout.Root>
              <InterpolationsListView hideRuleToggle configs={recentlyActive} />
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

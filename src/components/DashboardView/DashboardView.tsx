import {
  DropdownMenu,
  Callout,
  Container,
  Flex,
  Tabs,
  Text,
  Strong,
  IconButton,
} from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./DashboardView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import {
  CaretSortIcon,
  CheckIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, useMemo, useState } from "react";
import { TextInput } from "../TextInput/TextInput.tsx";

export const DashboardView = () => {
  const { interpolations, recentlyActive } = useInterpolationsContext();
  const [sortOption, setSortOption] = useState<
    "oldest" | "newest" | "atoz" | "ztoa"
  >("newest");
  const [selectedTab, setSelectedTab] = useState("all");
  const [filter, setFilter] = useState("");
  const sortedInterpolations = useMemo(() => {
    switch (sortOption) {
      case "atoz":
        return interpolations?.sort?.((a, b) =>
          a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1,
        );
      case "ztoa":
        return interpolations?.sort((a, b) =>
          a?.name?.toLowerCase() > b?.name?.toLowerCase() ? -1 : 1,
        );
      case "newest":
        return interpolations?.sort?.((a, b) =>
          b.createdAt > a.createdAt ? 1 : -1,
        );
      case "oldest":
      default:
        return interpolations?.sort?.((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1,
        );
    }
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
                <Flex width="stretch" p="1" align={"center"} justify={"start"}>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <IconButton variant="outline" size="1">
                        <CaretSortIcon height="20px" width="20px" />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <Text size="1" align="center">
                        Sort by:
                      </Text>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        onSelect={() => setSortOption("newest")}
                      >
                        <Text size="1">Newest</Text>
                        {sortOption === "newest" && <CheckIcon />}
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => setSortOption("oldest")}
                      >
                        <Text size="1">Oldest</Text>
                        {sortOption === "oldest" && <CheckIcon />}
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={() => setSortOption("atoz")}>
                        <Text size="1">A-Z</Text>
                        {sortOption === "atoz" && <CheckIcon />}
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={() => setSortOption("ztoa")}>
                        <Text size="1">Z-A</Text>
                        {sortOption === "ztoa" && <CheckIcon />}
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                  <TextInput
                    size="1"
                    style={{ maxWidth: "300px" }}
                    value={filter}
                    placeholder="Filter by keyword..."
                    onChange={handleFilterChange}
                    icon={<MagnifyingGlassIcon />}
                  />
                </Flex>
              )}
            </Flex>
            {!!parsedFilterValue && selectedTab === "all" && (
              <Text size="1">
                {filteredSortedOptions?.length} matches for "{filter}"
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

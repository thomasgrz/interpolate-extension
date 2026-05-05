import {
  Callout,
  Container,
  Flex,
  Text,
  Strong,
  ScrollArea,
  Separator,
  Card,
  Heading,
} from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./DashboardView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, ReactElement, useEffect, useMemo, useState } from "react";
import { TextInput } from "../TextInput/TextInput.tsx";
import {
  SortingOptions,
  SortOption,
} from "../SortingOptions/SortingOptions.tsx";
import { sortInterpolations } from "#src/utils/sortInterpolations.ts";
import { CollapsibleSection } from "../CollapsibleSection/CollapsibleSection.tsx";
import { FilteredSortedList } from "../FilteredSortedList/FilteredSortedList.tsx";
import { InterpolationsGroupsView } from "../InterpolationGroupsView/InterpolationsGroupsView.tsx";
import { CreateGroupView } from "../CreateGroupView/CreateGroupView.tsx";

const CollapsibleTitle = ({
  text,
  icon,
  callout,
}: {
  callout?: text;
  text: string;
  icon?: ReactElement;
}) => (
  <Flex
    style={{ cursor: "pointer" }}
    direction={"column"}
    p="2"
    justify={"center"}
  >
    <Strong>
      <Flex gap="3" align="center">
        {icon}
        <Text>{text}</Text>
      </Flex>
    </Strong>
  </Flex>
);

type ExpandedSection = "all" | "enabled" | "invoked" | "groups" | "none";

export const DashboardView = () => {
  const {
    enabledInterpolations,
    groups,
    onChangeFilter,
    onChangeSort,
    filter,
    interpolations,
    recentlyActive,
    sortOption,
    setShowGroups,
  } = useInterpolationsContext();
  const [error, setError] = useState<null | string>(null);
  const onSuccessfulGroupCreation = () => {
    setShowGroups(true);
  };
  const [expandedSection, setExpandedSection] =
    useState<ExpandedSection>("all");

  const handleMenuClick = (section: ExpandedSection) => {
    return () => {
      if (expandedSection === section) return setExpandedSection("none");
      setExpandedSection(section);
    };
  };
  return (
    <ErrorBoundary
      onError={(error) => setError(JSON.stringify(error?.stack))}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          {error}
        </Callout.Root>
      }
    >
      <Flex
        className={styles.Container}
        direction="column"
        height="100%"
        maxHeight={"100%"}
      >
        <Card p="0" m="2">
          <Flex direction="column" className={styles.TopArea}>
            <ControlCenter onCreate={onSuccessfulGroupCreation} />
            <TextInput
              p="0"
              pb="2"
              size="1"
              style={{ maxWidth: "300px" }}
              value={filter}
              placeholder="Filter by keyword..."
              onChange={(e) => onChangeFilter(e.target.value)}
              icon={<MagnifyingGlassIcon />}
            />
            <Flex p="1">
              <SortingOptions value={sortOption} onChange={onChangeSort} />
            </Flex>
          </Flex>
        </Card>
        <Flex
          direction="column"
          height="stretch"
          flexGrow={"grow"}
          overflow="hidden"
          style={{ backgroundColor: "var(--yellow-10)" }}
        >
          {filter && <FilteredSortedList filter={filter} />}
          <CollapsibleSection
            onOpenChange={handleMenuClick("all")}
            defaultIsOpen={expandedSection === "all"}
            title={
              <CollapsibleTitle
                text={`All interpolations (${interpolations?.length})`}
              />
            }
          >
            <InterpolationsListView configs={interpolations} />
          </CollapsibleSection>
          <CollapsibleSection
            onOpenChange={handleMenuClick("enabled")}
            defaultIsOpen={expandedSection === "enabled"}
            title={
              <CollapsibleTitle
                text={`Enabled (${enabledInterpolations?.length})`}
                callout={
                  <Text>
                    These are the interpolations you have{" "}
                    <Strong>enabled</Strong>
                  </Text>
                }
              />
            }
          >
            <InterpolationsListView
              hideRuleToggle
              configs={enabledInterpolations}
            />
          </CollapsibleSection>
          <CollapsibleSection
            onOpenChange={handleMenuClick("groups")}
            defaultIsOpen={expandedSection === "groups"}
            title={<CollapsibleTitle text={`Groups (${groups.length})`} />}
          >
            <Flex direction="column" pt="2">
              <CreateGroupView />
              <InterpolationsGroupsView />
            </Flex>
          </CollapsibleSection>
          <CollapsibleSection
            onOpenChange={handleMenuClick("invoked")}
            defaultIsOpen={expandedSection === "invoked"}
            title={
              <CollapsibleTitle
                text={`Invoked (${recentlyActive?.length})`}
                callout={
                  <Text>
                    These interpolations have been <Strong>invoked</Strong>{" "}
                    within this tab <Strong>since the last page load.</Strong>
                  </Text>
                }
              />
            }
          >
            <InterpolationsListView hideRuleToggle configs={recentlyActive} />
          </CollapsibleSection>
        </Flex>
      </Flex>
    </ErrorBoundary>
  );
};

import {
  Callout,
  Container,
  Flex,
  Text,
  Strong,
  ScrollArea,
  Separator,
  Card,
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

export const DashboardView = () => {
  const {
    enabledInterpolations,
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

  return (
    <ErrorBoundary
      onError={(error) => setError(JSON.stringify(error?.stack))}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          {error}
        </Callout.Root>
      }
    >
      <Flex direction="column" height="100%" maxHeight={"100%"}>
        <Flex direction="column" p="3">
          <ControlCenter onCreate={onSuccessfulGroupCreation} />
          <TextInput
            size="1"
            style={{ maxWidth: "300px" }}
            value={filter}
            placeholder="Filter by keyword..."
            onChange={(e) => onChangeFilter(e.target.value)}
            icon={<MagnifyingGlassIcon />}
          />
          <SortingOptions value={sortOption} onChange={onChangeSort} />
        </Flex>
        <Flex
          direction="column"
          height="stretch"
          flexGrow={"grow"}
          overflow="hidden"
        >
          {filter && <FilteredSortedList filter={filter} />}
          <CollapsibleSection
            flexGrow="3"
            title={
              <CollapsibleTitle
                text={`All interpolations (${interpolations?.length})`}
              />
            }
          >
            <InterpolationsListView configs={interpolations} />
          </CollapsibleSection>
          <CollapsibleSection
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
          <CollapsibleSection title={<CollapsibleTitle text="Groups" />}>
            <InterpolationsListView />
          </CollapsibleSection>
          <CollapsibleSection
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

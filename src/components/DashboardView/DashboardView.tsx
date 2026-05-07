import {
  Callout,
  DropdownMenu,
  Flex,
  Text,
  Strong,
  Card,
  Theme,
  Button,
  ScrollArea,
  Separator,
} from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./DashboardView.module.scss";
import { InterpolationsListView } from "../InterpolationsListView/InterpolationsListView.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";
import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { CheckCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ReactElement, useEffect, useState } from "react";
import { TextInput } from "../TextInput/TextInput.tsx";
import { SortingOptions } from "../SortingOptions/SortingOptions.tsx";
import { CollapsibleSection } from "../CollapsibleSection/CollapsibleSection.tsx";
import { FilteredSortedList } from "../FilteredSortedList/FilteredSortedList.tsx";
import { InterpolationsGroupsView } from "../InterpolationGroupsView/InterpolationsGroupsView.tsx";

const CollapsibleTitle = ({
  text,
  icon,
}: {
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
        <Text size="2">{text}</Text>
      </Flex>
    </Strong>
  </Flex>
);

type ThemeColor =
  | "grass"
  | "iris"
  | "blue"
  | "mint"
  | "ruby"
  | "slate"
  | "yellow";
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
  const [themeColor, setThemeColor] = useState<ThemeColor>("yellow");
  const [themeChoiceBackgroundColor, setThemeChoiceBackgroundColor] = useState<
    | "--mint-2"
    | "--grass-2"
    | "--iris-2"
    | "--blue-2"
    | "--yellow-2"
    | "--ruby-2"
    | "--slate-2"
  >("--yellow-2");
  const [themeChoiceActionColor, setThemeChoiceActionColor] = useState<
    | "--mint-5"
    | "--grass-5"
    | "--iris-5"
    | "--blue-5"
    | "--yellow-5"
    | "--ruby-5"
    | "--slate-5"
  >("--yellow-5");
  const [themeChoiceHighContrast, setThemeChoiceHighContrast] = useState<
    | "--mint-8"
    | "--grass-8"
    | "--iris-8"
    | "--blue-8"
    | "--yellow-8"
    | "--ruby-8"
    | "--slate-8"
  >("--yellow-8");
  const [expandedSection, setExpandedSection] =
    useState<ExpandedSection>("all");

  const handleMenuClick = (section: ExpandedSection) => {
    return () => {
      if (expandedSection === section) return setExpandedSection("none");
      setExpandedSection(section);
    };
  };
  const handleThemeSelect = (value: ThemeColor) => {
    setThemeChoiceBackgroundColor(`--${value}-2`);
    setThemeChoiceActionColor(`--${value}-5`);
    setThemeChoiceHighContrast(`--${value}-8`);
    setThemeColor(value);
    chrome?.storage?.local?.set({ themeColor: value });
  };

  useEffect(() => {
    chrome?.storage?.local.get("themeColor", ({ themeColor }) => {
      if (themeColor) {
        setThemeColor(themeColor);
        // @ts-expect-error TODO: fix types
        setThemeChoiceBackgroundColor(`--${themeColor as string}-2`);
        // @ts-expect-error TODO: fix types
        setThemeChoiceActionColor(`--${themeColor as string}-5`);
        // @ts-expect-error TODO: fix types
        setThemeChoiceHighContrast(`--${themeColor as string}-8`);
      }
    });
  }, []);

  return (
    <Theme
      style={{
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        // @ts-expect-error TODO: fix types
        "--theme-choice-background": `var(${themeChoiceBackgroundColor})`,
        "--theme-choice-action": `var(${themeChoiceActionColor})`,
        "--theme-choice-high-contrast": `var(${themeChoiceHighContrast})`,
      }}
      radius="large"
      appearance="inherit"
      scaling="90%"
    >
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
          <Card m="2" className={styles.TopArea}>
            <Flex direction="column">
              <ControlCenter onCreate={onSuccessfulGroupCreation} />
              <TextInput
                size="1"
                style={{ maxWidth: "300px" }}
                value={filter}
                placeholder="Filter by keyword..."
                onChange={(e) => onChangeFilter(e.target.value)}
                icon={<MagnifyingGlassIcon />}
              />
              <Flex p="1" justify={"between"} align={"center"}>
                <SortingOptions value={sortOption} onChange={onChangeSort} />
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button size="1" variant="ghost">
                      <Text size="1">theme: {themeColor} </Text>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    {[
                      "mint",
                      "grass",
                      "iris",
                      "blue",
                      "yellow",
                      "ruby",
                      "slate",
                    ].map((option) => {
                      return (
                        <DropdownMenu.Item
                          onSelect={() =>
                            handleThemeSelect(option as ThemeColor)
                          }
                        >
                          {option}{" "}
                          {themeColor === option && <CheckCircledIcon />}
                        </DropdownMenu.Item>
                      );
                    })}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
          </Card>
          <Separator size="4" />
          <Flex
            className={styles.Nav}
            direction="column"
            height="stretch"
            flexGrow={"grow"}
            overflow="hidden"
          >
            {filter && (
              <ScrollArea>
                <FilteredSortedList filter={filter} />{" "}
              </ScrollArea>
            )}
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
                />
              }
            >
              <InterpolationsListView
                hideRuleToggle
                configs={enabledInterpolations}
              />
            </CollapsibleSection>
            <CollapsibleSection
              onOpenChange={handleMenuClick("invoked")}
              defaultIsOpen={expandedSection === "invoked"}
              title={
                <CollapsibleTitle
                  text={`Invoked since last page load (${recentlyActive?.length ?? 0})`}
                />
              }
            >
              <InterpolationsListView hideRuleToggle configs={recentlyActive} />
            </CollapsibleSection>
            <CollapsibleSection
              onOpenChange={handleMenuClick("groups")}
              defaultIsOpen={expandedSection === "groups"}
              title={<CollapsibleTitle text={`Groups (${groups.length})`} />}
            >
              <InterpolationsGroupsView />
            </CollapsibleSection>
          </Flex>
        </Flex>
      </ErrorBoundary>
    </Theme>
  );
};

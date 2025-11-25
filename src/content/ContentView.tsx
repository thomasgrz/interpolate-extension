import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { Box, Button, Flex, IconButton, Theme } from "@radix-ui/themes";
import { Separator } from "radix-ui";
import { useEffect, useState } from "react";
import Hide from "../assets/hide.svg";
import Show from "../assets/show.svg";
import styles from "./ContentView.module.scss";

export const ContentView = () => {
  const [show, setShow] = useState(true);
  const [displayedRules, setDisplayedRules] = useState<AnyInterpolation[]>([]);

  const fetchRules = async () => {
    const _rules = await chrome.storage.local.get("rules");
    setDisplayedRules(_rules.rules);
  };

  const toggle = () => {
    setShow(!show);
    fetchRules();
  };

  useEffect(() => {
    fetchRules();
  }, []);

  useEffect(() => {
    InterpolateStorage.subscribeToChanges(async (changes) =>
      setDisplayedRules([
        ...changes.updates.headers,
        ...changes.updates.redirects,
        ...changes.updates.scripts,
      ]),
    );
  }, []);

  return (
    <Theme>
      <Box className={styles.ContentView}>
        <Flex align="end" direction={"row"}>
          <div
            data-ui-shown={show}
            className={show ? styles.DisplayedRules : styles.HiddenRules}
          >
            {displayedRules?.map?.((rule) => (
              <InterpolationCard key={rule.details.id} info={rule} />
            ))}
          </div>
          <Separator.Root />
          <Flex gap="1">
            <Button onClick={() => fetchRules()}> Refresh</Button>
            <IconButton color="green" onClick={toggle}>
              {show ? <Hide /> : <Show />}
            </IconButton>
          </Flex>
        </Flex>
      </Box>
    </Theme>
  );
};

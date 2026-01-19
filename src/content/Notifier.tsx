import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import { useInterpolations } from "@/hooks/useInterpolations/useInterpolations";
import { Toast } from "radix-ui";
import styles from "./Notifier.module.scss";
import { useEffect, useState } from "react";
import { Flex, Theme } from "@radix-ui/themes";
import { logger } from "@/utils/logger";
import { getCurrentTab } from "@/utils/browser/getCurrentTab";

export const Notifier = () => {
  // const { recentlyUsed } /= useInterpolations();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (recentlyUsed[0]) {
  //     setOpen(true);
  //   }
  // }, [recentlyUsed]);

  return (
    <Theme
      style={{
        minHeight: 0,
        backgroundColor: "transparent",
      }}
    ></Theme>
  );
};

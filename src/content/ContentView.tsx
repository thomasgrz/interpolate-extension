import { InterpolationCard } from "@/components/InterpolationCard/InterpolationCard";
import { Box, Flex, IconButton, Theme } from "@radix-ui/themes";
import { Separator } from "radix-ui";
import { useState } from "react";
import Hide from "../assets/hide.svg";
import Show from "../assets/show.svg";
import styles from "./ContentView.module.scss";
import { useInterpolations } from "@/hooks/useInterpolations/userInterpolations";
import { AnimatePresence, motion } from "motion/react";

const box: React.CSSProperties = {
  width: "100%",
  // height: 100,
  borderRadius: "10px",
};

export const ContentView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { interpolations } = useInterpolations();

  const toggle = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <Theme>
      <Box width="500px" className={styles.ContentView}>
        <Flex direction="column" gap="1" width="100%" align="end">
          <AnimatePresence>
            {!isVisible ? null : (
              <>
                {interpolations()?.map((rule) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                      },
                    }}
                    style={box}
                    key="box"
                  >
                    <Box
                      width={"100%"}
                      p="1"
                      className={styles.RuleCardContainer}
                    >
                      <InterpolationCard info={rule} />
                    </Box>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
          <Separator.Root />
          <IconButton size="4" color="green" onClick={toggle}>
            {isVisible ? <Hide /> : <Show />}
          </IconButton>
        </Flex>
      </Box>
    </Theme>
  );
};

import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  IconButton,
  SegmentedControl,
  Strong,
  DropdownMenu,
} from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DashboardControls } from "../DashboardControls/DashboardControls";
import { HeaderForm } from "../HeaderForm/HeaderForm";
import { RedirectForm } from "../RedirectForm/RedirectForm";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";
import { ScriptForm } from "../ScriptForm/ScriptForm";
import styles from "./Dashboard.module.scss";
import { useInterpolateFormSelection } from "@/hooks/useInterpolateFormSelection/useInterpolateFormSelection";
import { useInterpolationForm } from "@/hooks/useInterpolationForm/useInterpolationForm";
import { FormType } from "@/constants";
import { InterpolateContext } from "@/contexts/interpolate-context";
import { Import } from "../Import/Import.tsx";
import { Exporter } from "../Exporter/Exporter.tsx";
import { useInterpolations } from "../../hooks/useInterpolations/useInterpolations.ts";
import { DashboardNav } from "../DashboardNav/DashboardNav.tsx";
import { InterpolationsList } from "../InterpolationsList/InterpolationsList.tsx";
import { ControlCenter } from "../ControlCenter/ControlCenter.tsx";

export const Dashboard = ({ showRules = true }: { showRules?: boolean }) => {
  const form = useInterpolationForm();

  const { selectedForm, setSelectedForm } = useInterpolateFormSelection(
    FormType.REDIRECT,
  );

  const { interpolations, pauseAll, resumeAll, removeAll, allPaused } =
    useInterpolations();

  const handleAllPaused = async () => {
    pauseAll();
  };

  const handleAllResumed = async () => {
    resumeAll();
  };

  const handleDeleteAll = () => {
    removeAll();
  };

  const handleFormSelection = (selectedForm: FormType) => {
    setSelectedForm(selectedForm);
    form.reset();
  };

  const shouldShowRules = showRules && !!interpolations?.length;

  return (
    <ErrorBoundary
      onError={console.error}
      fallback={
        <Callout.Root style={{ height: "100%" }} color="red">
          Something went wrong
        </Callout.Root>
      }
    >
      <Container className={styles.Container} minHeight={"100dvh"}>
        <Flex
          minHeight={"100dvh"}
          flexGrow={"1"}
          justify={"start"}
          direction={"column"}
        >
          <Flex justify="center">
            <ControlCenter />
          </Flex>
          <InterpolationsList />
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

import { FormType } from "@/constants";
import { logger } from "@/utils/logger";
import { INTERPOLATE_SELECTED_FORM_KEY } from "@/utils/storage/storage.constants";
import { useEffect, useRef, useState } from "react";

export const useInterpolateFormSelection = (defaultForm: FormType) => {
  const [selectedForm, setSelectedForm] = useState<FormType | null>(
    defaultForm,
  );
  const hasCheckedDefault = useRef<true | null>(null);

  useEffect(() => {
    if (hasCheckedDefault.current) return;

    const handleResumedSelection = async () => {
      hasCheckedDefault.current = true;
      const initialSelectedForm = await chrome.storage.local.get(
        INTERPOLATE_SELECTED_FORM_KEY,
      );
      if (initialSelectedForm[INTERPOLATE_SELECTED_FORM_KEY]) {
        logger(
          `Initial selected form: ${
            initialSelectedForm[INTERPOLATE_SELECTED_FORM_KEY]
          }`,
        );
        setSelectedForm(initialSelectedForm[INTERPOLATE_SELECTED_FORM_KEY]);
      }
    };

    handleResumedSelection().catch(logger);
  }, []);

  useEffect(() => {
    chrome.storage.local.set({
      [INTERPOLATE_SELECTED_FORM_KEY]: selectedForm,
    });
  }, [selectedForm]);

  return { selectedForm: selectedForm ?? defaultForm, setSelectedForm };
};

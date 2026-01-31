import { useInterpolationForm } from "../../hooks/useInterpolationForm/useInterpolationForm.ts";
import { HeaderForm } from "../HeaderForm/HeaderForm.tsx";

export const EditHeaderForm = ({ defaultValues, onSuccess }) => {
  const form = useInterpolationForm({
    headerRuleForm: {
      ...defaultValues,
    },
  });
  return <HeaderForm onSuccess={onSuccess} form={form} editModeEnabled />;
};

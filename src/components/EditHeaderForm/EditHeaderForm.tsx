import { useInterpolationForm } from "../../hooks/useInterpolationForm/useInterpolationForm.ts";
import { HeaderForm } from "../HeaderForm/HeaderForm.tsx";

export const EditHeaderForm = ({
  defaultValues,
  onSuccess,
}: {
  defaultValues: {
    name: string;
    key: string;
    value: string;
  };
  onSuccess: () => void;
}) => {
  // @ts-expect-error TODO: fix types
  const form = useInterpolationForm({
    headerRuleForm: {
      ...defaultValues,
    },
  });
  // @ts-expect-error TODO: fix types
  return <HeaderForm onSuccess={onSuccess} form={form} editModeEnabled />;
};

import { useInterpolationForm } from "../../hooks/useInterpolationForm/useInterpolationForm.ts";
import { RedirectForm } from "../RedirectForm/RedirectForm.tsx";
export const EditRedirectForm = ({
  defaultValues,
  onSuccess,
}: {
  defaultValues: Record<string, unknown>;
  onSuccess?: () => void;
}) => {
  const form = useInterpolationForm({
    // @ts-expect-error TODO: fix types
    redirectRuleForm: {
      ...defaultValues,
    },
  });

  // @ts-expect-error TODO: fix types
  return <RedirectForm onSuccess={onSuccess} form={form} editModeEnabled />;
};

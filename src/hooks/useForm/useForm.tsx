import { createFormHook } from "@tanstack/react-form";
import {
  fieldContext,
  formContext,
  useFormContext,
} from "../../contexts/form-context.ts";
import SelectField from "@/components/SelectField/SelectField.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import TextField from "@/components/TextField/TextField.tsx";

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <button disabled={isSubmitting}> {label} </button>}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    SelectField,
    TextField,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

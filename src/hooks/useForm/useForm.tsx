import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import {
  fieldContext,
  formContext,
  useFormContext,
} from "../../contexts/form-context.ts";

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
    SelectField: lazy(
      () => import("../../components/SelectField/SelectField.js"),
    ),
    TextField: lazy(() => import("../../components/TextField/TextField.js")),
    TextArea: lazy(() => import("../../components/TextArea/TextArea.js")),
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

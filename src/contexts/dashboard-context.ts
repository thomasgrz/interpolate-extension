import { formOptions } from "@tanstack/react-form";

export const dashboardFormOptions = formOptions({
  defaultValues: {
    redirectRuleForm: {
      name: "",
      source: "",
      destination: "",
    },
    headerRuleForm: {
      name: "",
      key: "",
      value: "",
    },
    scriptForm: {
      name: "",
      body: "",
      runAt: "document_idle",
      allFrames: true,
      matches: "",
    },
  },
});

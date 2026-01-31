import { formOptions } from "@tanstack/react-form";

export const dashboardFormOptions = formOptions({
  editModeEnabled: false,
  editId: null,
  defaultValues: {
    redirectRuleForm: {
      name: "",
      source: "",
      destination: "",
      id: null,
    },
    headerRuleForm: {
      name: "",
      key: "",
      value: "",
      id: null,
    },
    scriptForm: {
      name: "",
      body: "",
      runAt: "document_idle",
      allFrames: true,
      matches: "",
      id: null,
    },
  },
});

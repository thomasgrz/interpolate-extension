export enum SubmitAction {
  CreateScript = "create-script",
  AddHeader = "add-header",
  AddRedirect = "add-redirect",
}

export enum FormType {
  SCRIPT = "script",
  HEADER = "header",
  REDIRECT = "redirect",
  IMPORT_RULES = "import_rules",
}

export const FormErrors = {
  MISSING_NAME: "Please provide a name for this interpolation",
};

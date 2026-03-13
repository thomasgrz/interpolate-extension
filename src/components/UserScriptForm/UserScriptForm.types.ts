export interface UserScriptFormValue {
  id?: string;
  name?: string;
  runAt?: string;
  script?: string;
}

export enum UserScriptFormPlaceholder {
  INTERPOLATION_NAME = "Cool Script",
  SCRIPT_BODY = 'alert("hello world");',
  RUN_AT = "document_start",
}

export enum UserScriptFormValidationError {
  INTERPOLATION_NAME = "Please give this interpolation name",
  SCRIPT_BODY = "Please define a script",
  MATCHER = "Please provide a valid RegEx",
}

export interface ScriptFormValue {
  name?: string;
  runAt?: string;
  script?: string;
}

export enum ScriptFormPlaceholder {
  INTERPOLATION_NAME = "Cool Script",
  SCRIPT_BODY = 'alert("hello world");',
  RUN_AT = "document_start",
}

export enum ScriptFormValidationError {
  INTERPOLATION_NAME = "Please give this interpolation name",
  SCRIPT_BODY = "Please define a script",
  MATCHER = "Please provide a valid RegEx",
}

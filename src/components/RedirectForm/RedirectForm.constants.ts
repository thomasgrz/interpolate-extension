import { FormErrors } from "#src/constants.ts";

export const RedirectFormErrors = {
  MISSING_NAME: FormErrors.MISSING_NAME,
  MISSING_REGEX_MATCHER: "Please provide a valid regular expression matcher",
  MISSING_DESTINATION: "Please provide a valid URL",
};

export interface RedirectFormValue {
  id?: string | number;
  name?: string;
  matcher?: string;
  destination?: string;
}

export enum RedirectFormLabel {
  INTERPOLATION_NAME = "Name:",
  REDIRECT_FROM = "RegEx matcher:",
  REDIRECT_TO = "Destination:",
}

export enum RedirectFormPlaceholder {
  INTERPOLATION_NAME = "From Google to https://example.com",
  REDIRECT_FROM = ".*google\.com/(.*)",
  REDIRECT_TO = "https://example.com/$1",
}

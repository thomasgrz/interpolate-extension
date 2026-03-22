import { FormErrors } from "#src/constants.ts";

export const AddHeaderFormErrors = {
  MISSING_NAME: FormErrors.MISSING_NAME,
  MISSING_HEADER_KEY: "Please provide a valid header key",
  MISSING_HEADER_VALUE: "Please provide a valid header value",
};

export enum AddHeaderFormPlaceholder {
  HEADER_KEY = "x-test-header",
  HEADER_VALUE = "foobar",
  INTERPOLATION_NAME = "My Test Header",
}

export enum AddHeaderFormLabel {
  INTERPOLATION_NAME = "Name:",
  HEADER_KEY = "Header key:",
  HEADER_VALUE = "Header value:",
}

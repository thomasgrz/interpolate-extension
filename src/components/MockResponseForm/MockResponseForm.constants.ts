export enum MockResponseFormErrors {
  INTERPOLATION_NAME = "Please provide a name for this interpolation",
  MATCHER = "Please provide a regular expression",
}

export enum MockResponseFormLabel {
  INTERPOLATION_NAME = "Name:",
  HTTP_STATUS = "HTTP Status Code:",
  BODY = "Response body:",
  MATCHER = "Request URL RegEx:",
}

export enum MockResponseFormPlaceholder {
  HTTP_STATUS = "200",
  INTERPOLATION_NAME = "Mock Example API response",
  BODY_HTML = "<h1>You've got example!</h1>",
  BODY_JSON = `{ status: "success",  code: "foobar" }`,
  MATCHER = ".*example.com/some/.*/path",
}

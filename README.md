# Interpolate web extension [beta]

> [!WARN] this extension is in beta and is subject to breaking changes

[Privacy Policy](./PRIVACY.md)

Interpolate scripts, redirects, and headers into the current tab.

#### User Script Interpolations

Create and manage user scripts that, when enabled, can be executed during specific document lifecycle events like `"document_start"`, `"document_end"`, or `"document_idle"`

![example_user_script](./docs/artifacts/example_user_script.png "Example of a user script that just console.log's hello world")

#### Header Interpolations

Append headers to outbound requests.

![example_headers](./docs/artifacts/example_headers.png "Example of header like X-Foo being applied")

#### Redirect Interpolations

Intercept and redirect requests that match a regex expression.

![example_options](./docs/artifacts/example_options.png "Show the original interpolations menu")

![example_redirect_form](./docs/artifacts/example_redirect_form.png "Example of defining a regex")

![example_redirect](./docs/artifacts/example_redirect_enforced.png "Example of redirect being enforced")

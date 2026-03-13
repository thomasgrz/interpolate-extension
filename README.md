# Interpolate web extension [beta] <span><img src="./docs/artifacts/icon-128.png" width="25" height="25" /></span>

> [!WARN] this extension is in beta and is subject to breaking changes

[Currently available in Chrome Web Store](https://chromewebstore.google.com/detail/interpolatebeta/hjcffgbkfajlmfpmjijiafmlbeofhbpe)

[Privacy Policy](./PRIVACY.md)

[Built with CRXJS](https://github.com/crxjs/chrome-extension-tools)

Interpolate allows developers to easily, and declaratively, do things like:
1. mock API responses with HTML or JSON payloads
2. add headers to requests
3. create & execute scripts
4. redirect any subset of requests


Interpolate configurations are reusable and modular -- they can easily be exported and imported as JSON.

![](./docs/artifacts/redirect_google_example.png)

#### User Script Interpolations

Create and manage user scripts that, when enabled, can be executed during specific document lifecycle events like `"document_start"`, `"document_end"`, or `"document_idle"`

![example_user_script](./docs/artifacts/example_user_script.png "Example of a user script that just console.log's hello world")

#### Header Interpolations

Append headers to outbound requests.

![example_headers](./docs/artifacts/example_headers.png "Example of header like X-Foo being applied")

#### Redirect Interpolations

Intercept and redirect requests that match a regex expression.

![example_redirect](./docs/artifacts/example_redirect_enforced.png "Example of redirect being enforced")

#### Mock API Interpolations

Intercept and mock responses to requests that match a regex expression.

| Mocked HTML response                                                                        | Mocked JSON payload response                                                                    |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![example_mock "Example of a mocked HTML response"](./docs/artifacts/example_mock_html.png) | ![example_mock_json "Example of a mocked JSON payload"](./docs/artifacts/example_mock_json.png) |

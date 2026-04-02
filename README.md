> [!WARN] Currently there is a bug where user created scripts are broken
> and will not execute in the browser as expected
> 
> Please follow the issue at https://github.com/thomasgrz/interpolate-extension/issues/109

# Interpolate web extension [beta] <span><img src="./docs/artifacts/icon-128.png" width="25" height="25" /></span>

> [!WARN] this extension is in beta and is subject to breaking changes

[Currently available in Chrome Web Store](https://chromewebstore.google.com/detail/interpolatebeta/hjcffgbkfajlmfpmjijiafmlbeofhbpe)

[Privacy Policy](./PRIVACY.md)

[Built with CRXJS](https://github.com/crxjs/chrome-extension-tools)

Interpolate allows developers to easily, and declaratively, do things like:

1. add headers to all outbound requests
2. redirect any subset of requests on a page
3. mock API responses with HTML docstrings or JSON payloads
4. create & execute user scripts

Interpolate configurations are reusable and modular -- they can easily be exported and imported as JSON.

#### Add Headers

Append headers to outbound requests.

![example_headers](./docs/artifacts/add-headers.png "Example of header like X-Foo being applied")

#### Redirect Requests

Intercept and redirect requests that match a regex expression.

![example_redirect](./docs/artifacts/redirect-docs.png "Example of redirect being enforced")

#### Mock APIs

Intercept and mock responses to requests that match a regex expression.

![example_mock "Example of a mocked HTML response"](./docs/artifacts/mock-api-doc.png)

![example_mock_json "Example of a mocked JSON response"](./docs/artifacts/mock-api-json.png)

#### Execute Scripts

Create and manage user scripts that, when enabled, can be executed during specific document lifecycle events like `"document_start"`, `"document_end"`, or `"document_idle"`

![example_user_script](./docs/artifacts/user-scripts.png "Example of a user script that just console.log's hello world")

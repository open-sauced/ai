## Folder Structure

The source code for the extension is located in the `src` directory. The `src` directory contains the following subdirectories:

- `assets`: contains static assets such as images and fonts.
- `content-scripts`: contains the content scripts that are used to manipulate the GitHub DOM.
    - `components`: contains the custom-made vanilla JS components that are injected into the GitHub DOM.
    - `github.ts`: contains the functions that are used to check which page the user is on and inject the appropriate components.
    - `content-scripts.css`: contains the styles for our injected components.
- `hooks`: contains custom React hooks that are used throughout the extension.
- `pages`: contains the React components that are used to render the extension popup. These components are conditionally rendered based using the `RouteContext` context defined in `App.tsx`.
- `ts`: contains the TypeScript type definitions for DTOs and other custom types.
- `utils`: contains utility functions that are used throughout the extension, such as functions for fetching OpenSauced API data, caching data, and parsing GitHub URLs.
    - `dom-utils`: contains pre-injection verification functions that are used to check which (if any) component should be injected into the GitHub DOM. Some checks that can be done here include checking if the user is authenticated, checking if a repo exists on OpenSauced, etc.
- `worker`: contains web workers that are used to run expensive tasks in the background, off the main thread.
For example, the `background.ts` script uses a web worker to check for authentication cookies in the background, so that the user can be logged in to the extension without having to enter any information directly in the extension popup.
- `App.tsx`: contains the main React component that is rendered in the extension popup. This component is wrapped in a `RouteContext` context provider, which is used to conditionally render the appropriate page based on the current URL. The first authentication check is also done here.
- `constants.ts`: contains constants that are used throughout the extension, such as the API endpoints, GitHub URLs and classes, etc.

<!-- TODO: document why we need two content-scripts.css files here. -->
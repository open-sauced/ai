## Adding a new component
So you've set up your development environment and you're ready to start contributing to the OpenSauced Chrome Extension. Great! Let's walk through the process of adding a new component to the extension, or updating an existing component.

Here are some steps to follow when adding a new component:

1. Identify the component you want to add or update, and it's location. The component can be present in either the Extension Popup, or be an injected component on the GitHub website. 
    * Injected components are located in their respective folders inside the `src/content-scripts/components` directory. 
    * Popup components are located in the `src/pages` directory. 

2. Adding popup components is relatively simpler, as they are just React components. You can add a new component by creating a new file in the `src/pages` directory, and importing it in the `src/App.tsx` file. This is already done for other components, so you can follow the same pattern.

3. Injected components are written in vanilla JavaScript, and are injected into the GitHub website using a content script. For adding a new injected component, you will need to identify which GitHub page you need to inject the component into. For example, the `src/content-scripts/components/ViewOnOpenSaucedButton` component is injected into the GitHub profile page. 

4. Once you've identified the page you want to inject the component into, you will need to add a conditonal statement in the `src/content-scripts/github.ts` file. This conditional statement will check if the current page is the page you want to inject the component into, and if it is, it will inject the component into the page. To match URL patterns inside the conditional statement, you can use the `window.location.href` variable, and create your own matcher inside the `src/utils.ts/urlMatcher.ts` file. Again, this is already done for other components, so you can follow the same pattern.

5. Once you've added the conditional statement to check for the current GitHub page, you can add an injection script for your component inside the `src/utils/dom-utils` directory. This injection script will be responsible for injecting your component into the page. You can follow the pattern of other injection scripts to add your own. Normally, all logical checks and validations are done inside the injection script, like the user being logged in, or the component not already being injected into the page. 

6. Inside the injection script, you create an instance of your component, and append it to the DOM. You can follow the pattern of other injection scripts to do this. We use the `src/utils/createHtmlElement.ts::createHtmlElement` function to create the DOM element for our component. The creation is done inside the `components` directory (including all event handlers, like click events), while the injection and locgical validations are done inside the `utils/dom-utils` directory.

Tada🎉! You've successfully added a new component to the extension. You can now test your component by running the extension locally, and checking if it works as expected.
 


import "../../content-scripts.css";
import { createHtmlElement } from "../../../utils/createHtmlElement";

export const UnvoteRepoButton = (repoName: string) => {
  const unvoteRepoButton = createHtmlElement("a", {
    className:
      "inline-block mt-4 text-black bg-gh-white dark:bg-gh-gray dark:text-white rounded-md p-2 text-sm font-semibold text-center select-none border hover:shadow-button hover:no-underline",
    innerHTML: `
            <span>Unvote</span>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"></path></g></svg>
        `,
  });
  return unvoteRepoButton;
};

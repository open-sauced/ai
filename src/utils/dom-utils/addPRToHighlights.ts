import { AddPRToHighlightsButton } from "../../content-scripts/components/AddPRToHighlights/AddPRToHighlightsButton";
import {
  GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR,
  GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  GITHUB_PR_COMMENT_HEADER_SELECTOR,
} from "../../constants";
import { isLoggedIn } from "../checkAuthentication";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectAddPRToHighlightsButton = async () => {
  if (!(await isLoggedIn())) {
 return;
}

  const prAuthorUserName = document.getElementsByClassName(
    GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  )[0].textContent;
  const loggedInUserUserName = document
    .querySelector(GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR)
    ?.getAttribute("content");

  if (loggedInUserUserName && prAuthorUserName === loggedInUserUserName) {
    if (!(await isPublicRepository(window.location.href))) {
 return;
}
    const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_HEADER_SELECTOR,
    )[0];
    const addPRToHighlightsButton = AddPRToHighlightsButton();

    commentFormatRow.insertBefore(
        addPRToHighlightsButton,
        commentFormatRow.lastElementChild,
      );
  }
};

export default injectAddPRToHighlightsButton;

import { AddPRToHighlightsButton } from "../../content-scripts/components/AddPRToHighlights/AddPRToHighlightsButton";
import {
  GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR,
  GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  GITHUB_PR_COMMENT_FORMAT_ROW_SELECTOR,
} from "../../constants";

const injectAddPRToHighlightsButton = () => {
  const prAuthorUserName = document.getElementsByClassName(
    GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  )[0].textContent;
  const loggedInUserUserName = document.querySelector(
    GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR,
  )?.getAttribute("content");

  if (loggedInUserUserName && prAuthorUserName === loggedInUserUserName) {
    const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_FORMAT_ROW_SELECTOR,
    )[0];
    const addPRToHighlightsButton = AddPRToHighlightsButton();

    commentFormatRow.insertBefore(
      addPRToHighlightsButton,
      commentFormatRow.firstChild,
    );
  }
};

export default injectAddPRToHighlightsButton;

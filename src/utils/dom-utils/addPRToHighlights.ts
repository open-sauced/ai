import { AddPRToHighlightsButton } from "../../content-scripts/components/AddPRToHighlights/AddPRToHighlightsButton";
import {
  GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR,
  GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  GITHUB_PR_COMMENT_HEADER_SELECTOR,
} from "../../constants";
import { isLoggedIn } from "../checkAuthentication";

const injectAddPRToHighlightsButton = async () => {
  if(!await isLoggedIn()) return;

  const prAuthorUserName = document.getElementsByClassName(
    GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  )[0]?.textContent;
  const loggedInUserUserName = document.querySelector(
    GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR,
  )?.getAttribute("content");
  console.log(prAuthorUserName, loggedInUserUserName);

  if (loggedInUserUserName && prAuthorUserName === loggedInUserUserName) {
    const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_HEADER_SELECTOR,
    )[0];
    const addPRToHighlightsButton = AddPRToHighlightsButton();

    if (!commentFormatRow.lastElementChild?.previousElementSibling?.isEqualNode(addPRToHighlightsButton)) {
    commentFormatRow.insertBefore(
      addPRToHighlightsButton,
      commentFormatRow.lastElementChild,
    );
    }
  }
};

export default injectAddPRToHighlightsButton;

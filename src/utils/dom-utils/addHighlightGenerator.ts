import { HighlightGeneratorButton } from "../../content-scripts/components/AddButtonToPage/HighlightGeneratorButton";
import {
  GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR,
  GITHUB_PR_AUTHOR_USERNAME_SELECTOR,
  GITHUB_PR_COMMENT_HEADER_EDITOR,
} from "../../constants";
import { isLoggedIn } from "../checkAuthentication";

const injectAddHighlightGeneratorButton = async () => {
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
    const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_HEADER_EDITOR,
    )[0];

    // todo: don't ship any HERE
    const addGeneratorButton: any = HighlightGeneratorButton();

    if (
      !commentFormatRow.lastElementChild?.previousElementSibling?.isEqualNode(
        addGeneratorButton,
      )
    ) {
      commentFormatRow.insertBefore(
        addGeneratorButton,
        commentFormatRow.lastElementChild,
      );
    }
  }
};

export default injectAddHighlightGeneratorButton;

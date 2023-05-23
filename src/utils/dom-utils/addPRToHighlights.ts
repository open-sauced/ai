import { AddPRToHighlightsButton } from "../../content-scripts/components/AddPRToHighlights/AddPRToHighlightsButton";
import {
  GITHUB_PR_COMMENT_HEADER_SELECTOR,
} from "../../constants";
import { isLoggedIn } from "../checkAuthentication";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectAddPRToHighlightsButton = async () => {
  if (!(await isLoggedIn())) {
    return;
  }

  if (!(await isPublicRepository(window.location.href))) {
    return;
  }
    
  const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_HEADER_SELECTOR,
    )[0];
  const addPRToHighlightsButton = AddPRToHighlightsButton();

  if (
      !commentFormatRow.lastElementChild?.previousElementSibling?.isEqualNode(
        addPRToHighlightsButton,
      )
    ) {
      commentFormatRow.insertBefore(
        addPRToHighlightsButton,
        commentFormatRow.lastElementChild,
      );
    }
};

export default injectAddPRToHighlightsButton;

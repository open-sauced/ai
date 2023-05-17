import { DescriptionGeneratorButton } from "../../content-scripts/components/GenerateAIDescription/DescriptionGeneratorButton";
import { GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR, GITHUB_PR_COMMENT_EDITOR_SELECTOR } from "../../constants";
import { isGithubPullRequestPage } from "../urlMatchers";

const injectDescriptionGeneratorButton = () => {
    const selector = isGithubPullRequestPage(window.location.href) ? GITHUB_PR_COMMENT_EDITOR_SELECTOR : GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR;
    const commentFormatRow = document.getElementsByClassName(selector)[0];
    const addGeneratorButton = DescriptionGeneratorButton();

    if (commentFormatRow.firstChild?.isEqualNode(addGeneratorButton)) {
      return;
    }
    commentFormatRow.insertBefore(addGeneratorButton, commentFormatRow.firstChild);
};

export default injectDescriptionGeneratorButton;

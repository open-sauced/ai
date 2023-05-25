import { DescriptionGeneratorButton } from "../../content-scripts/components/GenerateAIDescription/DescriptionGeneratorButton";
import { GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR, GITHUB_PR_COMMENT_EDITOR_SELECTOR } from "../../constants";
import { isGithubPullRequestPage } from "../urlMatchers";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectDescriptionGeneratorButton = async () => {
    if (document.getElementById("ai-description-button") || !(await isPublicRepository(window.location.href))) {
    return;
    }

    const selector = isGithubPullRequestPage(window.location.href) ? GITHUB_PR_COMMENT_EDITOR_SELECTOR : GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR;
    const commentFormatRow = document.getElementsByClassName(selector)[0];
    const addGeneratorButton = DescriptionGeneratorButton();

    commentFormatRow.insertBefore(addGeneratorButton, commentFormatRow.firstChild);
};

export default injectDescriptionGeneratorButton;

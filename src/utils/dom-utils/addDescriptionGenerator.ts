import { DescriptionGeneratorButton } from "../../content-scripts/components/GenerateAIDescription/DescriptionGeneratorButton";
import { GITHUB_PR_COMMENT_EDITOR_SELECTOR } from "../../constants";

const injectDescriptionGeneratorButton = async () => {
    const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_EDITOR_SELECTOR,
    )[0];

    const addGeneratorButton = DescriptionGeneratorButton();

    if (commentFormatRow.firstChild?.isEqualNode(addGeneratorButton)) {
      return;
    }
    commentFormatRow.insertBefore(addGeneratorButton, commentFormatRow.firstChild);
};

export default injectDescriptionGeneratorButton;

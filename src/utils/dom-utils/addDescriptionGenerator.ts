import { DescriptionGeneratorButton } from "../../content-scripts/components/GenerateAIDescription/DescriptionGeneratorButton";
import { GITHUB_PR_COMMENT_HEADER_EDITOR } from "../../constants";

const injectDescriptionGeneratorButton = async () => {
//   if (!(await isLoggedIn())) {
//  return;
// }
    const commentFormatRow = document.getElementsByClassName(
      GITHUB_PR_COMMENT_HEADER_EDITOR,
    )[0];

    const addGeneratorButton = DescriptionGeneratorButton();

    if (commentFormatRow.firstChild?.isEqualNode(addGeneratorButton)) {
      return;
    }
    commentFormatRow.insertBefore(addGeneratorButton, commentFormatRow.firstChild);
};

export default injectDescriptionGeneratorButton;

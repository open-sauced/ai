import { ChangeSuggestorButton } from "../../content-scripts/components/AICodeRefactor/ChangeSuggestorButton";
import { GITHUB_REVIEW_SUGGESTION_SELECTOR } from "../../constants";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectChangeSuggestorButton = async (commentNode: HTMLElement) => {
    if (!(await isPublicRepository(window.location.href))) {
        return;
    }

    const suggestChangesIcon = commentNode.getElementsByClassName(GITHUB_REVIEW_SUGGESTION_SELECTOR)[0];
    const changeSuggestorButton = ChangeSuggestorButton(commentNode);

    if (suggestChangesIcon.firstChild?.isEqualNode(changeSuggestorButton)) {
        console.log("Change suggestor button already exists");
        return;
    }
    console.log("Injecting change suggestor button", changeSuggestorButton);
    suggestChangesIcon.insertBefore(changeSuggestorButton, suggestChangesIcon.firstChild);
};

export default injectChangeSuggestorButton;

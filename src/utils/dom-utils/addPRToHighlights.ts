import { AddPRToHighlightsButton } from "../../content-scripts/components/AddPRToHighlights/AddPRToHighlightsButton";
import { GITHUB_PR_COMMENT_HEADER_CLASS } from "../../constants";
import { isLoggedIn } from "../checkAuthentication";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectAddPRToHighlightsButton = async () => {
    if (document.getElementById("add-pr-to-highlights-button") || !(await isLoggedIn()) || !(await isPublicRepository(window.location.href))) {
        return;
    }

    const commentFormatRow = document.getElementsByClassName(
        GITHUB_PR_COMMENT_HEADER_CLASS,
    )[0];
    const addPRToHighlightsButton = AddPRToHighlightsButton();

    commentFormatRow.insertBefore(
        addPRToHighlightsButton,
        commentFormatRow.lastElementChild,
    );
};

export default injectAddPRToHighlightsButton;

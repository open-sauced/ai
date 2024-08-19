import { GITHUB_REPO_ACTIONS_SELECTOR } from "../../constants";
import { VoteRepoButton } from "../../content-scripts/components/RepoVoting/RepoVoteButton";
import { RepoUnvoteButton } from "../../content-scripts/components/RepoVoting/RepoUnvoteButton";
import { isLoggedIn, getAuthToken } from "../checkAuthentication";
import {
    checkUserVotedRepo,
    repoExistsOnOpenSauced,
} from "../fetchOpenSaucedApiData";

const injectRepoVotingButtons = async (ownerName: string, repoName: string) => {
    if (
        document.getElementById("repo-voting-button") ||
        !(await isLoggedIn()) ||
        !(await repoExistsOnOpenSauced(ownerName, repoName))
    ) {
        return;
    }

    const repoActions = document.querySelector(GITHUB_REPO_ACTIONS_SELECTOR);

    if (!repoActions) {
        return;
    }

    const voteRepoButton = VoteRepoButton(ownerName, repoName);
    const repoUnvoteButton = RepoUnvoteButton(ownerName, repoName);
    const userToken = await getAuthToken();

    const userVotedRepo = await checkUserVotedRepo(userToken, repoName);

    if (userVotedRepo) {
        repoActions.appendChild(repoUnvoteButton);
    } else {
        repoActions.appendChild(voteRepoButton);
    }
};

export default injectRepoVotingButtons;

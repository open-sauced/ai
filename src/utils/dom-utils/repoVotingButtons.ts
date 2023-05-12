import { GITHUB_REPO_ACTIONS_SELECTOR } from "../../constants";
import { VoteRepoButton } from "../../content-scripts/components/RepoVoting/RepoVoteButton";
import { RepoUnvoteButton } from "../../content-scripts/components/RepoVoting/RepoUnvoteButton";
import { isLoggedIn, getAuthToken } from "../checkAuthentication";
import {
  checkUserVotedRepo,
  repoExistsOnOpenSauced,
} from "../fetchOpenSaucedApiData";

const injectRepoVotingButtons = async (ownerName: string, repoName: string) => {
  if (!(await isLoggedIn())) {
    return;
  }
  if (!(await repoExistsOnOpenSauced(ownerName, repoName))) {
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
    if (repoActions.lastChild?.isEqualNode(repoUnvoteButton)) {
      return;
    }
    repoActions.appendChild(repoUnvoteButton);
  } else {
    if (repoActions.lastChild?.isEqualNode(voteRepoButton)) {
      return;
    }
    repoActions.appendChild(voteRepoButton);
  }
};

export default injectRepoVotingButtons;

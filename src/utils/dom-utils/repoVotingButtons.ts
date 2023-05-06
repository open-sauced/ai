import { GITHUB_REPO_ACTIONS_SELECTOR } from "../../constants";
import { VoteRepoButton } from "../../content-scripts/components/RepoVoting/RepoVoteButton";
import { RepoUnvoteButton } from "../../content-scripts/components/RepoVoting/RepoUnvoteButton";
import { isLoggedIn, getAuthToken } from "../checkAuthentication";
import {
  checkUserVotedRepo,
  repoExistsOnOpenSauced,
} from "../fetchOpenSaucedApiData";

const injectRepoVotingButtons = async (ownerName: string, repoName: string) => {
  console.log(await repoExistsOnOpenSauced(ownerName, repoName));
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

  console.log(userVotedRepo);
  if (userVotedRepo) {
    repoActions.appendChild(repoUnvoteButton);
  } else {
    repoActions.appendChild(voteRepoButton);
  }
};

export default injectRepoVotingButtons;

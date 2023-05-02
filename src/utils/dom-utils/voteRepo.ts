import { GITHUB_REPO_ACTIONS_SELECTOR } from "../../constants";
import { VoteRepoButton } from "../../content-scripts/components/VoteRepo/VoteRepoButton";
import { UnvoteRepoButton } from "../../content-scripts/components/VoteRepo/UnvoteRepoButton";

export const injectVoteRepoButton = (repoName: string) => {
  const repoActions = document.querySelector(GITHUB_REPO_ACTIONS_SELECTOR);
  if (repoActions) {
    const voteRepoButton = VoteRepoButton(repoName);
    repoActions.appendChild(voteRepoButton);
  }
};

export const injectUnvoteRepoButton = (repoName: string) => {
  const repoActions = document.querySelector(GITHUB_REPO_ACTIONS_SELECTOR);
  if (repoActions) {
    const unvoteRepoButton = UnvoteRepoButton(repoName);
    repoActions.appendChild(unvoteRepoButton);
  }
};

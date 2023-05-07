import "../../content-scripts.css";
import { createHtmlElement } from "../../../utils/createHtmlElement";
import { getAuthToken } from "../../../utils/checkAuthentication";
import { OPEN_SAUCED_REPOS_ENDPOINT } from "../../../constants";
import { VoteRepoButton } from "./RepoVoteButton";

export const RepoUnvoteButton = (ownerName: string, repoName: string) => {
  const repoUnvoteButton = createHtmlElement("a", {
    className:
      "inline-block text-white rounded-md  text-sm  text-center select-none border hover:shadow-button hover:no-underline no-underline border-none cursor-pointer bg-gradient-to-r from-[#e67e22] to-[#d35400] py-1 px-2 mx-2",
    innerHTML: `
            <span>Unvote</span>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" class="align-middle"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"></path></g></svg>
        `,
  });

  repoUnvoteButton.addEventListener("click", async () => {
    repoUnvoteButton.innerHTML = `
      <span>Loading...</span>
    `;
    const userToken = await getAuthToken();

    const response = await fetch(
      `${OPEN_SAUCED_REPOS_ENDPOINT}/${ownerName}/${repoName}/vote`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      },
    );

    if (response.status === 200) {
      const voteRepoButton = VoteRepoButton(ownerName, repoName);

      repoUnvoteButton.replaceWith(voteRepoButton);
    } else {
      console.log("Something went wrong");
    }
  });


  return repoUnvoteButton;
};

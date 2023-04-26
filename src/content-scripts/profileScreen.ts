import { getGithubUsername } from "../utils/urlMatchers";
import { isOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/dom-utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/dom-utils/inviteToOpenSauced";

const processProfilePage = async () => {
const username = getGithubUsername(window.location.href);
if (username != null) {
  const user = await isOpenSaucedUser(username);
  if (user) injectViewOnOpenSauced(username);
  else injectInviteToOpenSauced(username);
}
};
processProfilePage();

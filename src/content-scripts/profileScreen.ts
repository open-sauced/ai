import { getGithubUsername } from "../utils/matchers/gh-username-matcher";
import { getOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/view-on-OS";
import injectInviteToOpenSauced from "../utils/invite-to-OS";

const username = getGithubUsername(window.location.href);
if (username != null) {
  const openSaucedUser = getOpenSaucedUser(username);
  if (openSaucedUser) injectViewOnOpenSauced(username);
  else injectInviteToOpenSauced(username);
}

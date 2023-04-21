import { getGithubUsername } from "../utils/urlMatchers";
import { getOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/dom-utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/dom-utils/inviteToOpenSauced";

const username = getGithubUsername(window.location.href);
if (username != null) {
  const openSaucedUser = await getOpenSaucedUser(username);
  if (openSaucedUser) injectViewOnOpenSauced(username);
  else injectInviteToOpenSauced(username);
}

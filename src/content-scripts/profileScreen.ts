import { getGithubUsername } from "../utils/matchers";
import { getOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/inviteToOpenSauced";

const username = getGithubUsername(window.location.href);
if (username != null) {
  const openSaucedUser = await getOpenSaucedUser(username);
  if (openSaucedUser) injectViewOnOpenSauced(username);
  else injectInviteToOpenSauced(username);
}

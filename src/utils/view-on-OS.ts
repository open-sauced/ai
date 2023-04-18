//import {USER_BIO_SELECTOR} from "../config.json" assert { type: 'json' };
import { ViewOnOpenSaucedButton } from "../components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSauced = (username: string) => {
  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const userBio = document.querySelector(".p-note.user-profile-bio");
  if (!userBio) return;

  userBio.appendChild(viewOnOpenSaucedButton);
};

export default injectViewOnOpenSauced;

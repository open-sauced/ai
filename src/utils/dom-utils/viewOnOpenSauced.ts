import { ViewOnOpenSaucedButton } from "../../components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const userBio = document.querySelector(
    ".p-nickname.vcard-username.d-block, button.js-profile-editable-edit-button"
  );
  if (!userBio || !userBio.parentNode) return;
  userBio.parentNode.replaceChild(viewOnOpenSaucedButton, userBio);
};

export default injectViewOnOpenSaucedButton;

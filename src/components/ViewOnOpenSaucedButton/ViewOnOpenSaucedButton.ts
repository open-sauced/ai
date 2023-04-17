import logoIcon from "../../assets/opensauced-icon.svg";
import "../../index.css";

export const ViewOnOpenSaucedButton = (username: string) => {
  const viewOnOpenSaucedButton = document.createElement("a");
  viewOnOpenSaucedButton.href = `https://insights.opensauced.pizza/user/${username}/contributions`;
  viewOnOpenSaucedButton.className =
    "inline-block mt-4 mb-1 text-white rounded-md p-2 no-underline text-md font-semibold text-center select-none w-full border border-solid cursor-pointer border-orange hover:shadow-button hover:no-underline";
  viewOnOpenSaucedButton.target = "_blank";
  viewOnOpenSaucedButton.rel = "noopener noreferrer";
  viewOnOpenSaucedButton.innerHTML = `
    <img
      class="mx-2 inline-block align-top"
      src="${chrome.runtime.getURL(logoIcon)}"
      alt="OpenSauced Logo"
      width="20"
      height="20"
    />
    <span>View On OpenSauced</span>
    `;
  return viewOnOpenSaucedButton;
};

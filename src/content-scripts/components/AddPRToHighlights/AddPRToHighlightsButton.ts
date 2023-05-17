import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const AddPRToHighlightsButton = () => {
  const addPRToHighlightsButton = createHtmlElement("a", {
    className: "relative",
    innerHTML: `<img class="mr-1 mt-1" height="16px" width="16px" src=${chrome.runtime.getURL(
      openSaucedLogoIcon,
    )}>
    <details-menu id="details-menu-os" class="dropdown-menu hidden dropdown-menu-sw color-fg-default w-48 mt-2">
    <a href="https://insights.opensauced.pizza/feed?prurl=${encodeURIComponent(window.location.href)}" class="dropdown-item" target="_blank">
    Add PR to Highlights
    </a>
  </details-menu>`,
    onclick: () => {
      const menu = document.getElementById("details-menu-os");
      if (!menu) return;
      menu.classList.toggle("hidden");
    }
  });

  return addPRToHighlightsButton;
};

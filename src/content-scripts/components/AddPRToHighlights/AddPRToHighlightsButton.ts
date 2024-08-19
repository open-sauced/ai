import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { OPEN_SAUCED_INSIGHTS_DOMAIN } from "../../../constants";

export const AddPRToHighlightsButton = () => {
    const addPRToHighlightsButton = createHtmlElement("a", {
        id: "add-pr-to-highlights-button",
        className: "relative cursor-pointer",
        innerHTML: `<img class="mr-1 mt-1" height="16px" width="16px" src=${chrome.runtime.getURL(
            openSaucedLogoIcon,
        )}>
    <details-menu id="details-menu-os" class="dropdown-menu hidden dropdown-menu-sw color-fg-default w-48 mt-2">
    <a href="https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/feed?new=true&prurl=${encodeURIComponent(
        window.location.href,
    )}" class="dropdown-item" target="_blank">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-plus">
        <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
      </svg> Add PR to Highlights
    </a>
  </details-menu>`,
        onclick: () => {
            const menu = document.getElementById("details-menu-os");

            if (!menu) {
                return;
            }
            menu.classList.toggle("hidden");
        },
    });

    addPRToHighlightsButton.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        const menu = document.getElementById("details-menu-os");

        if (!menu) {
            return;
        }
        menu.classList.add("hidden");
    });

    return addPRToHighlightsButton;
};

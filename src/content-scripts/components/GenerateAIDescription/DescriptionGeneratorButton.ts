import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { getPullRequestAPIURL } from "../../../utils/urlMatchers";
import { getPRDiff, getPRCommitMessages } from "../../../utils/aiprdescription/fetchGithubAPIData";

export const DescriptionGeneratorButton = () => {
  const descriptionGeneratorButton = createHtmlElement("a", {
    innerHTML: `<span id="ai-description-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-description-gen">Generate PR description</tool-tip>`,
    onclick: async () => {
      const url = getPullRequestAPIURL(window.location.href);
      const [diff, commitMessages] = await Promise.all([getPRDiff(url), getPRCommitMessages(url)]);
    }

  });

  return descriptionGeneratorButton;
};

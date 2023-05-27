import "../../content-scripts.css";
import { createHtmlElement } from "../../../utils/createHtmlElement";
import { getAuthToken } from "../../../utils/checkAuthentication";
import { getUserInsightsData, getRepoData, updateInsight } from "../../../utils/fetchOpenSaucedApiData";
import { IInsight } from "../../../ts/InsightDto";

export const InsightsSelectDropdown = async (ownerName: string, repoName: string) => {
    const insightsDropdown = createHtmlElement("div", {
        className: "SelectMenu cursor-default right-0 mt-1 hidden text-inherit",
        innerHTML: `
          <div class="SelectMenu-modal">
          <header class="SelectMenu-header px-3 py-2">
          <h5 class="SelectMenu-title f5 text-left">Add Repo To Insights</h5>
  
          <button class="SelectMenu-closeButton" type="button" aria-label="Close menu">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
            </svg>
          </button>
          </header>
          <div class="SelectMenu-list flex-1 overflow-y-auto px-3 pb-2 mb-0">
          </div>
          <footer class="SelectMenu-footer px-2">
            <button type="button" data-view-component="true" class="user-lists-menu-action btn-invisible btn btn-block text-left text-normal rounded-1 px-2">    
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-plus mr-1">
                <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
              </svg>
              Add Insight Page
            </button>
          </footer>
        `,
    });

    const userToken = await getAuthToken();
    const userInsightsData = await getUserInsightsData(userToken);
    const currentRepoData = await getRepoData(ownerName, repoName);

    const userInsights = userInsightsData.data as any[];

    const closeButton = insightsDropdown.querySelector(
        ".SelectMenu-closeButton",
    )!;

    closeButton.addEventListener("click", () => {
        insightsDropdown.classList.add("hidden");
    });

    const insightsList = insightsDropdown.querySelector(
        ".SelectMenu-list",
    )!;

    userInsights.forEach((insight: IInsight) => {
        const insightLabel = createHtmlElement("div", {
            className: "form-checkbox mt-1 mb-0 p-1",
            innerHTML: `
                <label class="d-flex">
                    <input type="checkbox" class="mx-0 js-user-list-menu-item">
                    <span data-view-component="true" class="Truncate ml-2 text-normal f5">
                        <span data-view-component="true" class="Truncate-text">${insight.name}</span>
                    </span>
                </label>
            `,
        });

        const insightCheckbox = insightLabel.querySelector(
            "input",
        )!;

        if (insight.repos.some((repo: any) => repo.repo_id === currentRepoData.id)) {
            insightCheckbox.setAttribute("checked", "true");
        }

        insightCheckbox.addEventListener("click", async () => {
            const currentRepoId = currentRepoData.id;
            const { checked } = insightCheckbox;

            const updatedInsight = await updateInsight(
                userToken,
                currentRepoId,
                checked,
                `${ownerName}/${repoName}`,
                insight,
            );

            if (!updatedInsight) {
                console.log("Something went wrong");
            }
        });

        insightsList.appendChild(insightLabel);
    });


    document.addEventListener("click", () => {
        insightsDropdown.classList.add("hidden");
    });

    insightsDropdown.addEventListener("click", e => {
        e.stopPropagation();
    });

    const addInsightBtn = insightsDropdown.querySelector(
        ".user-lists-menu-action",
    )!;

    addInsightBtn.addEventListener("click", () => {
        window.open(
            "https://insights.opensauced.pizza/hub/insights/new",
            "_blank",
        );
    });

    return insightsDropdown;
};


import "../../content-scripts.css";
import { createHtmlElement } from "../../../utils/createHtmlElement";
import { getAuthToken } from "../../../utils/checkAuthentication";
import { getUserInsightsData, getRepoData, updateInsight } from "../../../utils/fetchOpenSaucedApiData";
import { IInsight } from "../../../ts/InsightDto";

export const InsightsSelectDropdown = async (ownerName: string, repoName: string) => {
    const insightsDropdown = createHtmlElement("div", {
        className: "SelectMenu cursor-default right-0 mt-1 hidden",
        innerHTML: `
          <div class="SelectMenu-modal">
            <div class="SelectMenu-header">
              <span class="SelectMenu-title">Add repo to Insights</span>
            </div>
            <div class="SelectMenu-list flex-1 overflow-y-auto px-3 pb-2 mb-0">
              <div class="form-checkbox mt-1 mb-0 p-1">
                
              </div>
          </div>
          <footer class="SelectMenu-footer px-2">
            <button type="button" data-view-component="true" class="user-lists-menu-action btn-invisible btn btn-block text-left text-normal rounded-1 px-2">    
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-plus mr-1">
                <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
              </svg>
              Add Insight
            </button>
          </footer>
        `,
      });

    const userToken = await getAuthToken();
    const userInsightsData = await getUserInsightsData(userToken);
    const currentRepoData = await getRepoData(ownerName, repoName);

    const userInsights = userInsightsData.data as any[];

    const insightsList = insightsDropdown.querySelector(
        ".SelectMenu-list",
        )!;

    userInsights.forEach((insight: IInsight) => {
        const insightLabel = createHtmlElement("label", {
            className: "d-flex my-2",
            innerHTML: `
                <input type="checkbox" class="mx-0">
                <span data-view-component="true" class="Truncate ml-2 text-normal f5">
                    <span data-view-component="true" class="Truncate-text">${insight.name}</span>
                </span>
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


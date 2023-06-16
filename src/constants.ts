/* eslint-disable*/
const EnvironmentConstants = {
  OpenSaucedDomain: import.meta.env.VITE_OPEN_SAUCED_INSIGHTS_DOMAIN,
  OpenSaucedApiEndpoint: import.meta.env.VITE_OPEN_SAUCED_API_ENDPOINT,
  SupabaseLogin: import.meta.env.VITE_OPEN_SAUCED_SUPABASE_ID,
};

export const {
  OpenSaucedDomain: OPEN_SAUCED_INSIGHTS_DOMAIN,
  OpenSaucedApiEndpoint: OPEN_SAUCED_API_ENDPOINT,
  SupabaseLogin: SUPABASE,
} = EnvironmentConstants;

const SELECTORS = {
  Github: { SelectorName: "GITHUB" },
  Supabase: { SelectorName: "SUPABASE" },
  OpenSauced: { SelectorName: "OPEN_SAUCED" },
};

export const {
  SUPABASE_LOGIN_URL,
  SUPABASE_AUTH_COOKIE_NAME,
  OPEN_SAUCED_AUTH_TOKEN_KEY,
  OPEN_SAUCED_OPTED_LOG_OUT_KEY,
  AI_PR_DESCRIPTION_CONFIG_KEY,
} = {
  SUPABASE_LOGIN_URL: `https://${EnvironmentConstants.SupabaseLogin}.supabase.co/auth/v1/authorize?provider=github&redirect_to=https://${EnvironmentConstants.OpenSaucedDomain}/`,
  SUPABASE_AUTH_COOKIE_NAME: "supabase-auth-token",
  OPEN_SAUCED_AUTH_TOKEN_KEY: "os-access-token",
  OPEN_SAUCED_OPTED_LOG_OUT_KEY: "opted-log-out",
  AI_PR_DESCRIPTION_CONFIG_KEY: "ai-pr-description-config",
};
//OpenSauced Endpoints
export const OpenSaucedEndpoints = {
  USERS: "/users",
  REPOS: "/repos",
  SESSION: "/auth/session",
  USER_INSIGHTS: "/user/insights",
  AI_PR_DESCRIPTION: "/prs/description/generate",
  USER_HIGHLIGHTS: "/user/highlights",
  AI_CODE_REFACTOR: "/prs/suggestion/generate",
  AI_CODE_EXPLANATION: "/prs/explanation/generate",
  AI_CODE_TEST: "/prs/test/generate",
  HIGHLIGHTS: "/highlights/list",
};

//Forming and Exporting OpenSauced Enpoints
export const getApiEndpoints = () => {
  const OpenSaucedUrls: Record<string, string> = {};

  Object.keys(OpenSaucedEndpoints).forEach((key) => {
    const endpointKey = `${SELECTORS.OpenSauced.SelectorName}_${key}_ENDPOINT`;
    const endpointValue =
      EnvironmentConstants.OpenSaucedApiEndpoint +
      OpenSaucedEndpoints[key as keyof typeof OpenSaucedEndpoints];

    OpenSaucedUrls[endpointKey] = endpointValue;
  });
  return OpenSaucedUrls;
};

const OpenSaucedUrls = getApiEndpoints();

export const {
  OPEN_SAUCED_USERS_ENDPOINT,
  OPEN_SAUCED_REPOS_ENDPOINT,
  OPEN_SAUCED_SESSION_ENDPOINT,
  OPEN_SAUCED_USER_INSIGHTS_ENDPOINT,
  OPEN_SAUCED_AI_PR_DESCRIPTION_ENDPOINT,
  OPEN_SAUCED_USER_HIGHLIGHTS_ENDPOINT,
  OPEN_SAUCED_AI_CODE_REFACTOR_ENDPOINT,
  OPEN_SAUCED_AI_CODE_EXPLANATION_ENDPOINT,
  OPEN_SAUCED_AI_CODE_TEST_ENDPOINT,
  OPEN_SAUCED_HIGHLIGHTS_ENDPOINT,
} = OpenSaucedUrls;
//Github Selectors
export const GithubSelectors = {
  PROFILE_MENU: ".p-nickname.vcard-username.d-block",
  PROFILE_EDIT_MENU: "button.js-profile-editable-edit-button",
  PROFILE_USER_PROFILE_BIO:
    ".p-note.user-profile-bio.mb-3.js-user-profile-bio.f4",
  PR_COMMENT_HEADER: "timeline-comment-header clearfix d-flex",
  NEW_PR_COMMENT_EDITOR: "flex-nowrap d-none d-md-inline-block mr-md-0 mr-3",
  PR_COMMENT_EDITOR: "flex-nowrap d-inline-block mr-3",
  REVIEW_SUGGESTION: "js-suggestion-button-placeholder",
  REPO_ACTIONS: ".pagehead-actions",
  PR_COMMENT_TEXT_AREA: "pull_request[body]",
  PR_SUGGESTION_TEXT_AREA: "[name='comment[body]']",
  PR_BASE_BRANCH: "css-truncate css-truncate-target",
};
//Forming and expoting Github Selectors
export const getGithubSelectors = () => {
  const GithubSelectorsResult: Record<string, string> = {};

  for (const key in GithubSelectors) {
    const endpointKey = `${SELECTORS.Github.SelectorName}_${key}_ENDPOINT`;
    const endpointValue = GithubSelectors[key as keyof typeof GithubSelectors];

    GithubSelectorsResult[endpointKey] = endpointValue;
  }

  return GithubSelectorsResult;
};

const selectors = getGithubSelectors();

export const {
  GITHUB_PROFILE_MENU_SELECTOR,
  GITHUB_PROFILE_EDIT_MENU_SELECTOR,
  GITHUB_PROFILE_USER_PROFILE_BIO_SELECTOR,
  GITHUB_PR_COMMENT_HEADER_SELECTOR,
  GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR,
  GITHUB_PR_COMMENT_EDITOR_SELECTOR,
  GITHUB_REVIEW_SUGGESTION_SELECTOR,
  GITHUB_REPO_ACTIONS_SELECTOR,
  GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR,
  GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR,
  GITHUB_PR_BASE_BRANCH_SELECTOR,
} = selectors;

// External resources
export const EXTERNAL_RESOURCES = [
  {
    link: "https://docs.opensauced.pizza/chrome-extension/introduction-to-the-chrome-extension/",
    name: "Docs",
  },
  { link: "https://github.com/open-sauced/ai/issues", name: "Issues" },
  {
    link: "https://github.com/orgs/open-sauced/discussions",
    name: "Discussions",
  },
];

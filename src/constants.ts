const EnvironmentConstants = {
  OpenSaucedDomain: import.meta.env.VITE_OPEN_SAUCED_INSIGHTS_DOMAIN,
  OpenSaucedApiEndpoint: import.meta.env.VITE_OPEN_SAUCED_API_ENDPOINT,
  SupabaseLogin: import.meta.env.VITE_OPEN_SAUCED_SUPABASE_ID,
};

export const {
  OpenSaucedDomain: OPEN_SAUCED_INSIGHTS_DOMAIN,
  OpenSaucedApiEndpoint: OPEN_SAUCED_API_ENDPOINT,
  SupabaseLogin: SUPABASE_ID,
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

export const {
  openSaucedUsersEndpoint: OPEN_SAUCED_USERS_ENDPOINT,
  openSaucedReposEndpoint: OPEN_SAUCED_REPOS_ENDPOINT,
  openSaucedSessionEndpoint: OPEN_SAUCED_SESSION_ENDPOINT,
  openSaucedUserInsightsEndpoint: OPEN_SAUCED_USER_INSIGHTS_ENDPOINT,
  openSaucedAiPrDescriptionEndpoint: OPEN_SAUCED_AI_PR_DESCRIPTION_ENDPOINT,
  openSaucedUserHighlightsEndpoint: OPEN_SAUCED_USER_HIGHLIGHTS_ENDPOINT,
  openSaucedAiCodeRefactorEndpoint: OPEN_SAUCED_AI_CODE_REFACTOR_ENDPOINT,
  openSaucedAiCodeExplanationEndpoint: OPEN_SAUCED_AI_CODE_EXPLANATION_ENDPOINT,
  openSaucedAiCodeTestEndpoint: OPEN_SAUCED_AI_CODE_TEST_ENDPOINT,
  openSaucedHighlightsEndpoint: OPEN_SAUCED_HIGHLIGHTS_ENDPOINT,
} = {
  openSaucedUsersEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.REPOS}`,
  openSaucedReposEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.USERS}`,
  openSaucedSessionEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.SESSION}`,
  openSaucedUserInsightsEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.USER_INSIGHTS}`,
  openSaucedAiPrDescriptionEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.AI_PR_DESCRIPTION}`,
  openSaucedUserHighlightsEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.USER_HIGHLIGHTS}`,
  openSaucedAiCodeRefactorEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.AI_CODE_REFACTOR}`,
  openSaucedAiCodeExplanationEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.AI_CODE_EXPLANATION}`,
  openSaucedAiCodeTestEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.AI_CODE_TEST}`,
  openSaucedHighlightsEndpoint: `${EnvironmentConstants.OpenSaucedApiEndpoint}${OpenSaucedEndpoints.HIGHLIGHTS}`,
};

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

export const {
  githubProfileMenuSelector: GITHUB_PROFILE_MENU_SELECTOR,
  githubProfileEditMenuSelector: GITHUB_PROFILE_EDIT_MENU_SELECTOR,
  githubProfileUserProfileBioSelector: GITHUB_PROFILE_USER_PROFILE_BIO_SELECTOR,
  githubPrCommentHeaderSelector: GITHUB_PR_COMMENT_HEADER_SELECTOR,
  githubNewPrCommentEditorSelector: GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR,
  githubPrCommentEditorSelector: GITHUB_PR_COMMENT_EDITOR_SELECTOR,
  githubReviewSuggestionSelector: GITHUB_REVIEW_SUGGESTION_SELECTOR,
  githubRepoActionsSelector: GITHUB_REPO_ACTIONS_SELECTOR,
  githubPrCommentTextAreaSelector: GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR,
  githubPrSuggestionTextAreaSelector: GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR,
  githubPrBaseBranchSelector: GITHUB_PR_BASE_BRANCH_SELECTOR,
} = {
  githubProfileMenuSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PROFILE_MENU}_SELECTOR`,
  githubProfileEditMenuSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PROFILE_EDIT_MENU}_SELECTOR`,
  githubProfileUserProfileBioSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PROFILE_USER_PROFILE_BIO}_SELECTOR`,
  githubPrCommentHeaderSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PR_COMMENT_HEADER}_SELECTOR`,
  githubNewPrCommentEditorSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.NEW_PR_COMMENT_EDITOR}_SELECTOR`,
  githubPrCommentEditorSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PR_COMMENT_EDITOR}_SELECTOR`,
  githubReviewSuggestionSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.REVIEW_SUGGESTION}_SELECTOR`,
  githubRepoActionsSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.REPO_ACTIONS}_SELECTOR`,
  githubPrCommentTextAreaSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PR_COMMENT_TEXT_AREA}_SELECTOR`,
  githubPrSuggestionTextAreaSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PR_SUGGESTION_TEXT_AREA}_SELECTOR`,
  githubPrBaseBranchSelector: `${SELECTORS.Github.SelectorName}_${GithubSelectors.PR_BASE_BRANCH}_SELECTOR`,
};

// External resources
export const EXTERNAL_RESOURCES = [
  {
    link: "https://docs.opensauced.pizza/chrome-extension/introduction-to-the-chrome-extension/",
    key: "Docs",
  },
  { link: "https://github.com/open-sauced/ai/issues", name: "Issues" },
  {
    link: "https://github.com/orgs/open-sauced/discussions",
    key: "Discussions",
  },
];

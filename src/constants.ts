// OpenSauced constants
export const SUPABASE_LOGIN_URL = "https://ibcwmlhcimymasokhgvn.supabase.co/auth/v1/authorize?provider=github&redirect_to=https://insights.opensauced.pizza/";
export const SUPABASE_AUTH_COOKIE_NAME = "supabase-auth-token";
export const OPEN_SAUCED_AUTH_TOKEN_KEY = "os-access-token";
export const OPEN_SAUCED_INSIGHTS_DOMAIN = "insights.opensauced.pizza";
export const AI_PR_DESCRIPTION_CONFIG_KEY = "ai-pr-description-config";

// API endpoints
export const OPEN_SAUCED_USERS_ENDPOINT = "https://api.opensauced.pizza/v1/users";
export const OPEN_SAUCED_REPOS_ENDPOINT = "https://api.opensauced.pizza/v1/repos";
export const OPEN_SAUCED_SESSION_ENDPOINT = "https://api.opensauced.pizza/v1/auth/session";
export const OPEN_SAUCED_USER_INSIGHTS_ENDPOINT = "https://api.opensauced.pizza/v1/user/insights";
export const OPEN_SAUCED_AI_PR_DESCRIPTION_ENDPOINT = "https://api.opensauced.pizza/v1/prs/description/generate";
export const OPEN_SAUCED_AI_CODE_REFACTOR_ENDPOINT = "https://api.opensauced.pizza/v1/prs/suggestion/generate";

// GitHub constants/selectors
export const GITHUB_PROFILE_MENU_SELECTOR = ".p-nickname.vcard-username.d-block";
export const GITHUB_PROFILE_EDIT_MENU_SELECTOR = "button.js-profile-editable-edit-button";
export const GITHUB_PROFILE_USER_PROFILE_BIO_SELECTOR = ".p-note.user-profile-bio.mb-3.js-user-profile-bio.f4";
export const GITHUB_PR_COMMENT_HEADER_SELECTOR = "timeline-comment-header clearfix d-flex";
export const GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR = "flex-nowrap d-none d-md-inline-block mr-md-0 mr-3";
export const GITHUB_PR_COMMENT_EDITOR_SELECTOR = "flex-nowrap d-inline-block mr-3";
export const GITHUB_REVIEW_SUGGESTION_SELECTOR = "js-suggestion-button-placeholder";
export const GITHUB_REPO_ACTIONS_SELECTOR = ".pagehead-actions";
export const GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR = "pull_request[body]";
export const GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR = "[name='comment[body]']";
export const GITHUB_PR_BASE_BRANCH_SELECTOR = "css-truncate css-truncate-target";

// External Links
export const EXTERNAL_RESOURCES = [
    { link: "https://docs.opensauced.pizza/chrome-extension/introduction-to-the-chrome-extension/", key: "Docs" },
    { link: "https://github.com/open-sauced/ai/issues", key: "Issues" },
    { link: "https://github.com/orgs/open-sauced/discussions", key: "Discussions" },
];

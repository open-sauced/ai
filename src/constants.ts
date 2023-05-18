// OpenSauced constants
export const SUPABASE_LOGIN_URL = "https://ibcwmlhcimymasokhgvn.supabase.co/auth/v1/authorize?provider=github&redirect_to=https://insights.opensauced.pizza/";
export const SUPABASE_AUTH_COOKIE_NAME = "supabase-auth-token";
export const OPEN_SAUCED_AUTH_TOKEN_KEY = "os-access-token";
export const OPEN_SAUCED_INSIGHTS_DOMAIN = "insights.opensauced.pizza";
export const AI_PR_DESCRIPTION_CONFIG_KEY = "ai-pr-description-config";
export const OPEN_AI_COMPLETION_MODEL_NAME = "gpt-3.5-turbo";

// API endpoints
export const OPEN_SAUCED_USERS_ENDPOINT = "https://api.opensauced.pizza/v1/users";
export const OPEN_SAUCED_REPOS_ENDPOINT = "https://api.opensauced.pizza/v1/repos";
export const OPEN_SAUCED_SESSION_ENDPOINT = "https://api.opensauced.pizza/v1/auth/session";

// GitHub constants/selectors
export const GITHUB_PROFILE_MENU_SELECTOR = ".p-nickname.vcard-username.d-block";
export const GITHUB_PROFILE_EDIT_MENU_SELECTOR = "button.js-profile-editable-edit-button";
export const GITHUB_PR_AUTHOR_USERNAME_SELECTOR = "author Link--primary text-bold css-overflow-wrap-anywhere";
export const GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR = "meta[name=\"user-login\"]";
export const GITHUB_PR_COMMENT_HEADER_SELECTOR = "timeline-comment-header clearfix d-flex";
export const GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR = "flex-nowrap d-none d-md-inline-block mr-md-0 mr-3";
export const GITHUB_PR_COMMENT_EDITOR_SELECTOR = "flex-nowrap d-inline-block mr-3";
export const GITHUB_REPO_ACTIONS_SELECTOR = ".pagehead-actions";
export const GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR = "pull_request[body]";
export const GITHUB_PR_BASE_BRANCH_SELECTOR = "css-truncate css-truncate-target";

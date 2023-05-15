// OpenSauced constants
export const SUPABASE_LOGIN_URL = "https://ibcwmlhcimymasokhgvn.supabase.co/auth/v1/authorize?provider=github&redirect_to=https://insights.opensauced.pizza/";
export const SUPABASE_AUTH_COOKIE_NAME = "supabase-auth-token";
export const OPEN_SAUCED_AUTH_TOKEN_KEY = "os-access-token";
export const OPEN_SAUCED_INSIGHTS_DOMAIN = "insights.opensauced.pizza";

// API endpoints
export const OPEN_SAUCED_USERS_ENDPOINT = "https://api.opensauced.pizza/v1/users";
export const OPEN_SAUCED_REPOS_ENDPOINT = "https://api.opensauced.pizza/v1/repos";
export const OPEN_SAUCED_SESSION_ENDPOINT = "https://api.opensauced.pizza/v1/auth/session";
export const OPEN_SAUCED_USER_INSIGHTS_ENDPOINT = "https://api.opensauced.pizza/v1/user/insights";

// GitHub constants/selectors
export const GITHUB_PROFILE_MENU_SELECTOR = ".p-nickname.vcard-username.d-block";
export const GITHUB_PROFILE_EDIT_MENU_SELECTOR = "button.js-profile-editable-edit-button";
export const GITHUB_PR_AUTHOR_USERNAME_SELECTOR = "author Link--primary text-bold css-overflow-wrap-anywhere";
export const GITHUB_LOGGED_IN_USER_USERNAME_SELECTOR = "meta[name=\"user-login\"]";
export const GITHUB_PR_COMMENT_HEADER_SELECTOR = "timeline-comment-header clearfix d-flex";
export const GITHUB_REPO_ACTIONS_SELECTOR = ".pagehead-actions";

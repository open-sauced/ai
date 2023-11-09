// OpenSauced constants
export const OPEN_SAUCED_INSIGHTS_DOMAIN = import.meta.env.VITE_OPEN_SAUCED_INSIGHTS_DOMAIN;
export const OPEN_SAUCED_API_ENDPOINT = import.meta.env.VITE_OPEN_SAUCED_API_ENDPOINT;
export const REPO_QUERY_API_ENDPOINT = "https://opensauced.tools";
export const SUPABASE_LOGIN_URL = `https://${import.meta.env.VITE_OPEN_SAUCED_SUPABASE_ID}.supabase.co/auth/v1/authorize`;

export const REPO_QUERY_EMBED_ENDPOINT = `${REPO_QUERY_API_ENDPOINT}/embed`;
export const REPO_QUERY_QUERY_ENDPOINT = `${REPO_QUERY_API_ENDPOINT}/query`;
export const REPO_QUERY_COLLECTION_ENDPOINT = `${REPO_QUERY_API_ENDPOINT}/collection`;

export const SUPABASE_AUTH_COOKIE_NAME = `sb-${import.meta.env.VITE_OPEN_SAUCED_SUPABASE_ID}-auth-token`;
export const SUPABASE_PKCE_VERIFIER_COOKIE_NAME = `sb-${import.meta.env.VITE_OPEN_SAUCED_SUPABASE_ID}-auth-token-code-verifier`;
export const OPEN_SAUCED_AUTH_TOKEN_KEY = "os-access-token";
export const OPEN_SAUCED_OPTED_LOG_OUT_KEY = "opted-log-out";
export const AI_PR_DESCRIPTION_CONFIG_KEY = "ai-pr-description-config";


export const OPEN_SAUCED_USERS_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/users`;
export const OPEN_SAUCED_REPOS_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/repos`;
export const OPEN_SAUCED_SESSION_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/auth/session`;
export const OPEN_SAUCED_USER_INSIGHTS_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/user/insights`;
export const OPEN_SAUCED_AI_PR_DESCRIPTION_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/prs/description/generate`;
export const OPEN_SAUCED_USER_HIGHLIGHTS_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/user/highlights`;
export const OPEN_SAUCED_AI_CODE_REFACTOR_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/prs/suggestion/generate`;
export const OPEN_SAUCED_AI_CODE_EXPLANATION_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/prs/explanation/generate`;
export const OPEN_SAUCED_AI_CODE_TEST_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/prs/test/generate`;
export const OPEN_SAUCED_HIGHLIGHT_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/highlights`;
export const OPEN_SAUCED_HIGHLIGHTS_LIST_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/highlights/list`;
export const OPEN_SAUCED_EMOJIS_ENDPOINT = `${OPEN_SAUCED_API_ENDPOINT}/emojis`;

// Content-scripts selectors
export const GITHUB_PROFILE_MENU_CLASS = ".p-nickname.vcard-username.d-block";
export const GITHUB_PROFILE_EDIT_MENU_CLASS = "button.js-profile-editable-edit-button";
export const GITHUB_PR_COMMENT_HEADER_CLASS = "timeline-comment-header clearfix d-flex";
export const GITHUB_REVIEW_SUGGESTION_CLASS = "js-suggestion-button-placeholder";
export const GITHUB_REPO_ACTIONS_CLASS = ".pagehead-actions";
export const GITHUB_PR_COMMENT_TEXT_AREA_CLASS = "pull_request[body]";
export const GITHUB_PR_SUGGESTION_TEXT_AREA_CLASS = "[name='comment[body]']";
export const GITHUB_PR_BASE_BRANCH_CLASS = "css-truncate css-truncate-target";
export const LINKEDIN_PROJECT_FORM_CLASS = ".artdeco-text-input--input";

// External Links
export const EXTERNAL_RESOURCES = [
    { link: "https://docs.opensauced.pizza/chrome-extension/introduction-to-the-chrome-extension/", key: "Docs" },
    { link: "https://github.com/open-sauced/ai/issues", key: "Issues" },
    { link: "https://github.com/orgs/open-sauced/discussions", key: "Discussions" },
];

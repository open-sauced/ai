import { cachedFetch } from "./cache";
import {
    OPEN_SAUCED_USERS_ENDPOINT,
    OPEN_SAUCED_SESSION_ENDPOINT,
    OPEN_SAUCED_REPOS_ENDPOINT,
    OPEN_SAUCED_USER_INSIGHTS_ENDPOINT,
    OPEN_SAUCED_USER_HIGHLIGHTS_ENDPOINT,
    OPEN_SAUCED_HIGHLIGHTS_LIST_ENDPOINT,
    OPEN_SAUCED_HIGHLIGHT_ENDPOINT,
    OPEN_SAUCED_EMOJIS_ENDPOINT,
} from "../constants";
import { IInsight } from "../ts/InsightDto";
import { GeneralAPIResponse, Highlights } from "../ts/types";

export const isOpenSaucedUser = async (username: string) => {
    try {
        const response = await fetch(
            `${OPEN_SAUCED_USERS_ENDPOINT}/${username}`,
        );

        if (response.status === 200) {
            const data = await response.json();

            return data.is_open_sauced_member;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const checkTokenValidity = async (token: string) => {
    const response = await fetch(OPEN_SAUCED_SESSION_ENDPOINT, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.status === 200;
};

export const getUserData = async (userName: string, forceRefresh: boolean = false) => cachedFetch(`${OPEN_SAUCED_USERS_ENDPOINT}/${userName}`, {
    expireInSeconds: 2 * 60 * 60,
    forceRefresh,
    headers: { Accept: "application/json" },
}).then(async resp => {
    if (!resp?.ok) {
        console.log("error getting user info");
    }
    return resp?.json();
})
    .then(json => json);

export const getUserPRData = async (userName: string, forceRefresh: boolean = false) => cachedFetch(`${OPEN_SAUCED_USERS_ENDPOINT}/${userName}/prs`, {
    expireInSeconds: 2 * 60 * 60,
    forceRefresh,
    headers: { Accept: "application/json" },
}).then(async resp => {
    if (!resp?.ok) {
        console.log("error getting user PR info");
    }
    return resp?.json();
})
    .then(json => json);

export const getUserHighlightsData = async (userName: string, forceRefresh: boolean = false) => cachedFetch(`${OPEN_SAUCED_USERS_ENDPOINT}/${userName}/highlights`, {
    expireInSeconds: 2 * 60 * 60,
    forceRefresh,
    headers: { Accept: "application/json" },
}).then(async resp => {
    if (!resp?.ok) {
        console.log("error getting user highlights info");
    }
    return resp?.json();
})
    .then(json => json);

const getUserVotes = async (userToken: string, page: number = 1, limit: number = 1000, repos: any[] = []): Promise<any[]> => {
    const response = await fetch(
        `${OPEN_SAUCED_REPOS_ENDPOINT}/listUserVoted?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${userToken}` },
        },
    );

    if (response.status === 200) {
        const votesData = await response.json();

        const newRepos = repos.concat(votesData.data);

        if (votesData.data.length === limit) {
            return getUserVotes(userToken, page + 1, limit, newRepos);
        }
        return newRepos;
    }
    return repos;
};


export const checkUserVotedRepo = async (userToken: string, repoName: string) => {
    const userVotes = await getUserVotes(userToken);

    return userVotes.some((repo: any) => repo.name === repoName);
};

export const repoExistsOnOpenSauced = async (ownerName: string, repoName: string) => {
    const response = await fetch(
        `${OPEN_SAUCED_REPOS_ENDPOINT}/${ownerName}/${repoName}`,
    );

    return response.status === 200;
};

export const getRepoData = async (ownerName: string, repoName: string, forceRefresh: boolean = false) => cachedFetch(`${OPEN_SAUCED_REPOS_ENDPOINT}/${ownerName}/${repoName}`, {
    expireInSeconds: 2 * 60 * 60,
    forceRefresh,
    headers: { Accept: "application/json" },
}).then(async resp => {
    if (!resp?.ok) {
        console.log("error getting repo info");
    }
    return resp?.json();
})
    .then(json => json);

export const voteOrUnvoteRepo = async (userToken: string, ownerName: string, repoName: string, method: "PUT" | "DELETE") => {
    const response = await fetch(
        `${OPEN_SAUCED_REPOS_ENDPOINT}/${ownerName}/${repoName}/vote`,
        {
            method,
            headers: { Authorization: `Bearer ${userToken}` },
        },
    );

    return response.status === 200;
};

export const getUserInsightsData = async (userToken: string) => {
    const response = await fetch(
        `${OPEN_SAUCED_USER_INSIGHTS_ENDPOINT}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${userToken}` },
        },
    );

    return response.json();
};

export const updateInsight = async (userToken: string, repoId: string, checked: boolean, repoFullName: string, insight: IInsight) => {
    insight.repos = insight.repos.map((repo: any) => ({
        id: repo.repo_id,
        fullName: repo.full_name,
    }));

    const response = await fetch(
        `${OPEN_SAUCED_USER_INSIGHTS_ENDPOINT}/${insight.id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: insight.name,
                is_public: insight.is_public,
                repos: checked
                    ? [
                        ...insight.repos,
                        {
                            id: repoId,
                            fullName: `${repoFullName}`,
                        },
                    ]
                    : insight.repos.filter(
                        (repo: any) => repo.id !== repoId,
                    ),
            }),
        },
    );

    return response.status === 200;
};
export const getHighlights = async (): Promise<Highlights | undefined> => {
    const response = await cachedFetch(
        `${OPEN_SAUCED_HIGHLIGHTS_LIST_ENDPOINT}?limit=10`,
        {
            method: "GET",
            expireInSeconds: 300,
        },
    );

    if (!response) {
        return;
    }
    return response.json();
};

export const createHighlight = async (userToken: string, url: string, title: string, highlight: string, shipped_at?: string) => fetch(OPEN_SAUCED_USER_HIGHLIGHTS_ENDPOINT, {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
    },
    method: "POST",
    body: JSON.stringify({
        url,
        title,
        shipped_at,
        highlight,
    }),
});

export const getHighlightReactions = async (highlightId: string):Promise<Record<string, string>[]> => {
    const response = await fetch(`${OPEN_SAUCED_HIGHLIGHT_ENDPOINT}/${highlightId}/reactions`, { method: "GET" });

    return response.json();
};

export const getEmojis = async ():Promise<GeneralAPIResponse> => {
    const response = await fetch(`${OPEN_SAUCED_EMOJIS_ENDPOINT}`, { method: "GET" });

    return response.json();
};

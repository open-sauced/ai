import { cachedFetch } from "./cache";
import { OPEN_SAUCED_USERS_ENDPOINT, OPEN_SAUCED_SESSION_ENDPOINT, OPEN_SAUCED_REPOS_ENDPOINT } from "../constants";

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

export const voteOrUnvoteRepo = async (userToken: string, ownerName: string, repoName: string, vote: boolean) => {
  const response = await fetch(
    `${OPEN_SAUCED_REPOS_ENDPOINT}/${ownerName}/${repoName}/vote`,
    {
      method: vote ? "POST" : "DELETE",
      headers: { Authorization: `Bearer ${userToken}` },
    },
  );

  return response.status === 200;
};

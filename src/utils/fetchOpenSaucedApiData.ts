import { cachedFetch } from "./cache";
import { OPEN_SAUCED_USERS_ENDPOINT, OPEN_SAUCED_SESSION_ENDPOINT } from "../constants";

export const isOpenSaucedUser = async (username: string) => {
  try {
    const response = await fetch(
      `${OPEN_SAUCED_USERS_ENDPOINT}/${username}`
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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 200;
};

export const getUserData = async (userName: string, forceRefresh: boolean = false) => {
  return cachedFetch(`https://api.opensauced.pizza/v1/users/${userName}`, {
    expireInSeconds: 2 * 60 * 60, // 2 hours
    forceRefresh,
    headers: {
      Accept: 'application/json',
    },
  }).then((resp) => {
    if (!resp.ok) {
      console.log('error getting user info')
    }
    return resp.json()
  })
    .then((json) => {
      // console.log(json)
      return json
    })
}

export const getUserPRData = async (userName: string, forceRefresh: boolean = false) => {
  return cachedFetch(`https://api.opensauced.pizza/v1/users/${userName}/prs`, {
    expireInSeconds: 2 * 60 * 60, // 2 hours
    forceRefresh,
    headers: {
      Accept: 'application/json',
    },
  }).then((resp) => {
    if (!resp.ok) {
      console.log('error getting user PR info')
    }
    return resp.json()
  })
    .then((json) => {
      // console.log(json)
      return json
    })
}
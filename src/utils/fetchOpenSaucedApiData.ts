import { cachedFetch } from "./cache";

export const getOpenSaucedUser = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.opensauced.pizza/v1/users/${username}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const isOpenSaucedUser = async (username: string) => {
  return await getOpenSaucedUser(username) != false;
}

export const checkTokenValidity = async (token: string) => {
  const url = "https://api.opensauced.pizza/v1/auth/session";
  const response = await fetch(url, {
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
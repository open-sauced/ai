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

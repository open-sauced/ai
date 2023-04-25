export const getOpenSaucedUser = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.opensauced.pizza/v1/users/${username}`
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
  const url = "https://api.opensauced.pizza/v1/auth/session";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 200;
};

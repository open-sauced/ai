export const getOpenSaucedUser = async (username: string) => {
  const response = await fetch(
    `https://api.opensauced.pizza/v1/users/${username}`
  );
  if (response.status !== 200) {
    return null;
  }
  return await response.json();
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

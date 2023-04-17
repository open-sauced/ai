export const getOpenSaucedUser = async (username: string) => {
  const response = await fetch(
    `https://api.opensauced.pizza/v1/users/${username}`
  );
  if (response.status !== 200) {
    return null;
  }
  return await response.json();
};

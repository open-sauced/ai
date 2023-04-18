export const getOpenSaucedUser = (username: string) => {
  fetch(`https://api.opensauced.pizza/v1/users/${username}`).then(
    (response) => {
      if (response.status !== 200) return false;
    }
  );
  return true;
};

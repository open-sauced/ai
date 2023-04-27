import { SUPABASE_LOCAL_STORAGE_KEY } from "../constants";

const getAccessToken = (): string | null => {
  const localStore = window.localStorage.getItem(SUPABASE_LOCAL_STORAGE_KEY);

  if (localStore === null) {
    return null;
  }
  return JSON.parse(localStore)?.currentSession?.access_token;
};

export default getAccessToken;


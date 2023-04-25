const getAccessToken = (): string | null => {
    const localStore = window.localStorage.getItem("supabase.auth.token");
    if (localStore === null) return null;
    return JSON.parse(localStore)?.currentSession?.access_token;
  };
  
  export default getAccessToken;
  
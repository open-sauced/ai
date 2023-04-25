const setAccessTokenInChromeStorage = (accessToken: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ "os-access-token": accessToken }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  };
  
  export default setAccessTokenInChromeStorage;
  
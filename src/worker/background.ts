chrome.webRequest.onCompleted.addListener(
    (details) => {
      chrome.storage.sync.remove("os-access-token");
    },
    { urls: ["https://ibcwmlhcimymasokhgvn.supabase.co/auth/v1/logout"] }
  );
  
export {};
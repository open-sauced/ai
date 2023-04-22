import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import getAccessToken from "../utils/getAccessToken";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";

const processHotOSHomePage = async () => {
  const data = await chrome.storage.sync.get(["os-access-token"]);
  if (data["os-access-token"]) return;
  try {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const isValid = await checkTokenValidity(accessToken);
    if (!isValid) return;

    await setAccessTokenInChromeStorage(accessToken);
  } catch (error) {
    console.error("Error processing Hot home page:", error);
  }
};

//The local storage takes time to set after the document is idle
setTimeout(processHotOSHomePage, 1000);

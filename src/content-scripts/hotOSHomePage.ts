import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import getAccessToken from "../utils/getAccessToken";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";
import { OPEN_SAUCED_AUTH_TOKEN_KEY } from "../constants";

const processHotOSHomePage = async () => {
  const data = await chrome.storage.sync.get([OPEN_SAUCED_AUTH_TOKEN_KEY]);

  if (data[OPEN_SAUCED_AUTH_TOKEN_KEY]) {
 return;
}
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
 return;
}

    const isValid = await checkTokenValidity(accessToken);

    if (!isValid) {
 return;
}

    await setAccessTokenInChromeStorage(accessToken);
  } catch (error) {
    console.error("Error processing Hot home page:", error);
  }
};

// the local storage takes time to set after the document is idle
setTimeout(processHotOSHomePage, 1000);

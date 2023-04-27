import { useEffect, useState } from "react";
import { isOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import { getGithubUsername } from "../utils/urlMatchers";

export const useOpensaucedUserCheck = () => {
  const [currentTabIsOpensaucedUser, setCurrentTabIsOpensaucedUser] = useState(false);
  const [checkedUser, setCheckedUser] = useState<string|null>(null);

  useEffect(() => {
    // get active tab
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        const username = getGithubUsername(tab.url!);

        if (username) {
          setCheckedUser(username);
          setCurrentTabIsOpensaucedUser(await isOpenSaucedUser(username));
        } else {
          setCheckedUser(null);
          setCurrentTabIsOpensaucedUser(false);
        }
      }
    });
  }, []);


  return { currentTabIsOpensaucedUser, checkedUser };
};

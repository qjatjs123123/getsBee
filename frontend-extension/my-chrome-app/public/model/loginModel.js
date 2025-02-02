/* eslint-disable no-undef */
const loginModel = (() => {
  let accessToken = "";
  let refreshToken = "";
  let userState = null;

  function init() {
    window.addEventListener("message", (event) => {
      const userData = {
        accessToken: event.data.accessToken,
        refreshToken: event.data.refreshToken,
        userState: event.data.userState,
      };
      switch (event.data.type) {
        case "TOKEN_UPDATE":
          accessToken = event.data.accessToken;
          refreshToken = event.data.refreshToken;
          userState = event.data.userState;
          saveChrome(() => {}, userData);
          break;
        case "TOKEN_DELETE":
          deleteChrome(() => {});
          break;
        default:
      }
    });
  }

  function login() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["GETSBEE_LOGIN"], (result) => {
        if (result.GETSBEE_LOGIN && result.GETSBEE_LOGIN.accessToken) {
          accessToken = result.GETSBEE_LOGIN.accessToken;
          refreshToken = result.GETSBEE_LOGIN.refreshToken;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async function refresh() {
    try {
      const responseData = await apiFunc("https://getsbee.kr/api/v1/auth/reissue", "POST", {
        accessToken,
        refreshToken,
      });

      const data = {
        accessToken: responseData.data.accessToken,
        refreshToken: responseData.data.refreshToken,
        userState,
      };

      accessToken = data.accessToken;
      refreshToken = data.refreshToken;

      saveChrome(() => {}, data);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveChrome(callFunc, data) {
    await chrome.storage.sync.set({ GETSBEE_LOGIN: data }, () => callFunc());
  }

  function logout() {
    accessToken = "";
    refreshToken = "";
    chrome.storage.sync.remove("GETSBEE_LOGIN", () => {});
    window.location.reload();
  }

  return {
    init,
    login,
    refresh,
    saveChrome,
    logout,
    getAccessToken: () => accessToken,
  };
})();

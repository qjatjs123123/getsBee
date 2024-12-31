/* eslint-disable no-undef */
const loginModel = {
  accessToken: "",
  refreshToken: "",
  userState: null,

  /** 
   * getsBee에서 로그인 했을 때 정보 postMessage 형태로 전달
   */
  init() {
    window.addEventListener("message", (event) => {
      const userData = {
        accessToken: event.data.accessToken,
        refreshToken: event.data.refreshToken,
        userState: event.data.userState,
      };
      switch (event.data.type) {

        case "TOKEN_UPDATE":
          this.accessToken = event.data.accessToken;
          this.refreshToken = event.data.refreshToken;
          this.userState = event.data.userState;
          this.saveChrome(() => {}, userData);
          break;

        case "TOKEN_DELETE":
          this.deleteChrome(() => {});
          break;

        default:

      }
    });
  },

  login() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["GETSBEE_LOGIN"], (result) => {
        if (result.GETSBEE_LOGIN && result.GETSBEE_LOGIN.accessToken) {
          this.accessToken = result.GETSBEE_LOGIN.accessToken;
          this.refreshToken = result.GETSBEE_LOGIN.refreshToken;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },

  async refresh() {
    try {
      const responseData = await apiFunc(`https://getsbee.kr/api/v1/auth/reissue`, "POST", {
        accessToken : this.accessToken,
        refreshToken : this.refreshToken
      });

      const data = {
        accessToken: responseData.data.accessToken,
        refreshToken: responseData.data.refreshToken,
        userState: this.userState,
      };

      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;

      this.saveChrome(() => {}, data);

    } catch (error) {
      console.log(error);
    }
  },

  async saveChrome(callFunc, data) {
    // 로그인 정보
    await chrome.storage.sync.set({
      GETSBEE_LOGIN: data
    }, () => callFunc());
  },

  logout() {
    this.accessToken = "";
    this.refreshToken = "";

    chrome.storage.sync.remove("GETSBEE_LOGIN", () => {});
    window.location.reload()
  },
}
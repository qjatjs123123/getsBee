/* eslint-disable no-undef */
async function apiFunc( url, method, body, callFunc) {
  const loginResult = await loginModel.login();

  if (!loginResult) { 
    window.open("https://getsbee.kr/about", "_blank");
    return;
  }
  // await loginModel.login();
  try {
    const response = await fetch(
      url,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginModel.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (response.status === 401) {
      await loginModel.refresh();
      await loginModel.login();
      await apiFunc(url, method, body); 
    }

    // if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
  }
}

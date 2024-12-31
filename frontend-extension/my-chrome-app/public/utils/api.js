/* eslint-disable no-undef */
async function apiFunc( url, method, body, callFunc) {
  await apiInterceptor();

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

    return await handleAPIStatus(response, url, method, body);
    
  } catch (error) {
    throw new Error(error);
  }
}

async function apiInterceptor() {
  const loginResult = await loginModel.login();

  if (!loginResult) { 
    window.open("https://getsbee.kr/about", "_blank");
    throw new Error(ERROR_LOG.LOGIN);
  }
}

async function handleAPIStatus(response, url, method, body) {
  switch (response.status) {
    case 200:
      return await response.json();
    case 401:
      await handleRefresh(response, url, method, body);
      break;
    default:
      throw new Error(`Unexpected error: ${response.status}`);
  }
}

async function handleRefresh(url, method, body) {
  await loginModel.refresh();
  await loginModel.login();
  await apiFunc(url, method, body); 
}
import React, { FC, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface UserInfo {
  email: string;
  name: string;
  picture: string;
}

const Auth: FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = async (credentialResponse: any) => {
    console.log(credentialResponse);
    const { credential } = credentialResponse;
    console.log(credential);

    try {
      const decodedToken: any = jwtDecode(credential);
      console.log(decodedToken);

      // 사용자 정보 설정
      setUser({
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      });

      // 서버로 ID 토큰 전송
      await sendTokenToServer(credential);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    setUser(null);
  };

  const sendTokenToServer = async (idToken: string) => {
    try {
      const response = await fetch('YOUR_SERVER_AUTH_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, provider: 'GOOGLE' }),
        credentials: 'include', // 쿠키를 포함하기 위해 필요합니다
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isSuccess) {
          // 액세스 토큰을 저장합니다 (예: 로컬 스토리지)
          localStorage.setItem('accessToken', data.data.accessToken);
          console.log('Access Token Expires In:', data.data.accessTokenExpiresIn);
          console.log('Refresh Token has been set in the browser cookies');
        } else {
          console.error('Authentication failed:', data.message);
        }
      } else {
        console.error('Server responded with an error');
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <img src={user.picture} alt={user.name} />
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      )}
    </GoogleOAuthProvider>
  );
};

export default Auth;

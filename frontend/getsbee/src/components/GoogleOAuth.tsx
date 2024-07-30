import React, { FC, useState } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UserInfo {
  email: string;
  name: string;
  picture: string;
}

interface GoogleJwtPayload extends JwtPayload {
  email: string;
  name: string;
  picture: string;
}

const GoogleOAuth: FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const serverAuthEndpoint = import.meta.env.VITE_SERVER_AUTH_ENDPOINT;

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    const { credential } = credentialResponse;
    if (credential) {
      console.log(credential);

      try {
        const decodedToken: GoogleJwtPayload = jwtDecode(credential);
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
    } else {
      console.error('Credential is undefined');
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    setUser(null);
  };

  const sendTokenToServer = async (idToken: string) => {
    try {
      const response = await axios.post(
        serverAuthEndpoint,
        { idToken, provider: 'GOOGLE' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키를 포함하기 위해 필요
        },
      );

      if (response.data.isSuccess) {
        // 로컬 스토리지에 액세스 토큰을 저장
        localStorage.setItem('accessToken', response.data.data.accessToken);
        console.log('Access Token Expires In:', response.data.data.accessTokenExpiresIn);
        console.log('Refresh Token has been set in the browser cookies');
      } else {
        console.error('Authentication failed:', response.data.message);
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

export default GoogleOAuth;

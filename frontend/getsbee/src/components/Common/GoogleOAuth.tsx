import React, { FC } from 'react';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/userState';
import axios from '../../api/axiosConfig';

interface GoogleJwtPayload extends JwtPayload {
  email: string;
  name: string;
  picture: string;
}

const GoogleOAuth: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const serverAuthEndpoint = '/auth/login';

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
        await sendTokenToServer(credential, {
          email: decodedToken.email,
          name: decodedToken.name,
          picture: decodedToken.picture,
        });
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

  const sendTokenToServer = async (idToken: string, props: unknown) => {
    try {
      const response = await axios.post(serverAuthEndpoint, { idToken, provider: 'GOOGLE' });

      if (response.data.isSuccess) {
        // 로컬 스토리지에 액세스 토큰을 저장
        localStorage.setItem('accessToken', response.data.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.data.token.refreshToken);
        localStorage.setItem('block', response.data.data.block);

        window.postMessage(
          {
            type: 'TOKEN_UPDATE',
            accessToken: response.data.data.token.accessToken,
            refreshToken: response.data.data.token.refreshToken,
            block: response.data.data.block,
            userState: props,
          },
          '*',
        );

        console.log(response);
        console.log('Access Token:', response.data.data.token.accessToken);
        console.log('Refresh Token:', response.data.data.token.refreshToken);
        console.log('Block:', response.data.data.block);
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

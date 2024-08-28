import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';

interface ResponseData {
  isSuccess: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

const Test: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data] = useState<ResponseData | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<ResponseData>('posts/7', {});
        console.log(data);

        if (data.isSuccess && data.data) {
          //   const { accessToken, refreshToken } = data.data;
          //   localStorage.setItem('accessToken', accessToken);
          //   localStorage.setItem('refreshToken', refreshToken);
          //   setData(data);
          //   console.log('Access Token:', accessToken);
          //   console.log('Refresh Token:', refreshToken);
        } else {
          setError(`Authentication failed: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.name === 'AbortError') {
            console.log('Request was aborted');
          } else {
            setError(`Error sending token to server: ${error.message}`);
          }
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>Test Component</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Test;

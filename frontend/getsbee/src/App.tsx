import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from './recoil/userState';
import { userRouteSelector } from './recoil/userState';

import PrivateRoute from './pages/PrivateRoute';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import MyHive from './pages/MyHive';
import About from './pages/About';
import Following from './pages/Following';
import Follower from './pages/Follower';
import DirectoryUpdate from './pages/DirectoryUpdate';
import RecommendDetail from './pages/RecommendDetail';
import SearchPost from './pages/SearchPost';
import SearchDirectory from './pages/SearchDirectory';
import SearchURL from './pages/SearchURL';
import MyHiveDir from './pages/MyHiveDir';
import Error from './pages/Error';

function App() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const userRoute = useRecoilValue(userRouteSelector);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      navigate('/about');
    };

    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, [setUser]);

  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/myhive" element={<Navigate to={userRoute || '/about'} replace />} />
        <Route path="/myhive/:username/:directoryId" element={<MyHiveDir />} />
        <Route path="/myhive/:username" element={<MyHive />} />
        <Route path="/following/:username" element={<Following />} />
        <Route path="/follower/:username" element={<Follower />} />
        {/* <Route path="/update" element={<DirectoryUpdate />} /> */}
        <Route path="/myhive/:username/update" element={<DirectoryUpdate />} />
        <Route path="/posts/:postId" element={<RecommendDetail />} />
        <Route path="/search/post" element={<SearchPost />} />
        <Route path="/search/directory" element={<SearchDirectory />} />
        <Route path="/search/url" element={<SearchURL />} />
        <Route path="/error" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;

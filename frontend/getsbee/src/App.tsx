import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/myHive" element={<MyHive />} />
      <Route path="/about" element={<About />} />
      <Route path="/following" element={<Following />} />
      <Route path="/follower" element={<Follower />} />
      <Route path="/update" element={<DirectoryUpdate />} />
      <Route path="/recommend/detail" element={<RecommendDetail />} />
      <Route path="/search/post" element={<SearchPost />} />
      <Route path="/search/directory" element={<SearchDirectory />} />
      <Route path="/search/url" element={<SearchURL />} />
    </Routes>
  );
}

export default App;

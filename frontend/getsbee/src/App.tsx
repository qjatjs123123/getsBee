import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import MyHive from './pages/MyHive';
import About from './pages/About';
import TapButton from './components/Common/TapButton';
import SideBar from './components/Common/SideBar';
import MainSearchBar from './components/Common/MainSearchBar';
import GoogleOAuthButton from './components/GoogleOAuthButton';

axios.defaults.baseURL = 'http://localhost:5173/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <TapButton />
      <SideBar />
      <MainSearchBar />
      <GoogleOAuthButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/myhive" element={<MyHive />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import MyHive from './pages/MyHive';
import About from './pages/About';
import TapButton from './components/Common/TapButton';
import SideBar from './components/Common/SideBar';
import MainSearchBar from './components/Common/MainSearchBar';

function App() {
  return (
    <>
      <TapButton />
      <SideBar />
      <MainSearchBar />

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

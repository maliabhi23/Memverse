import logo from './logo.svg';
import './App.css';
import MemeExplorer from './pages/MemeExplorer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import HomePage from './pages';
import Homepage from './pages/Homepage';

import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/profile';

import MemeDetails from './pages/MemeDetails';
import MemeUpload from './pages/MemeUpload';
import UserProfile from './pages/UserProfile';
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<MemeExplorer />} />
        <Route path="/upload" element={<MemeUpload />} />
      
        <Route path="/meme/:id" element={<MemeDetails />} />
        <Route path="/Userprofile" element={<UserProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;

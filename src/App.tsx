import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './pages/Home';
import MapList from './pages/MapList';
import Map from './pages/Map';
import PlayerList from './pages/PlayerList';
import Player from './pages/Player';
import "./css/main.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className="banner"></div>
            <Header />
            <main className="page-body">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/maps" element={<MapList />} />
                    <Route path="/maps/:id" element={<Map />} />
                    <Route path="/players" element={<PlayerList />} />
                    <Route path="/players/:id" element={<Player />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
import React, { useEffect, useState } from 'react';
import 'css/main.css';
import 'css/home.css';
import 'css/kofi.css';
import { colorTypeChart } from '../utils/colors';

interface ApiResponse {
    player_count: number;
    map_count: number;
    clear_count: number;
    full_clear_count: number;
    golden_clear_count: number;
}

const Home: React.FC = () => {
    const [stats, setStats] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://13.60.36.31/api/stats/?format=json')
            .then((response) => response.json())
            .then((data: ApiResponse) => {
                setStats(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!stats) {
        return <div style={{color: 'white', fontSize: 50}}>Error: Stats data not found</div>;
    }

    // console.log(playerCount);

    return (
        <div id="main-container">
            <title>Home - Hardest Maps Clear List</title>
            <meta name="og:title" content="Home - Hardest Maps Clear List" />
            <meta name="og:description" content="The hardest maps clear list is the home of Celeste's hardest maps ever made, maintained by some of the game's most skilled players. " />
            <section className="home-box">
                <h2 className="box-title">Welcome to the Hardest Maps Clear List!</h2>
                <p>This website is dedicated to showcasing the most difficult maps in Celeste. Here, you'll find a comprehensive list of the hardest completed maps, alongside the players of those who have accomplished these feats. This is the place where you can push the limits of your skill with perserverance and determination.</p>
                <div className="home-links">
                    <a href="/maps">
                        <p>Maps</p>
                        <i className="fa fa-list-ol fa-2x" aria-hidden="true"></i>
                    </a>
                    <a href="/players">
                        <p>Players</p>
                        <i className="fa fa-trophy fa-2x" aria-hidden="true"></i>
                    </a>
                    <a href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit#gid=2029222410">
                        <p>Changelog</p>
                        <i className="fa fa-info fa-2x" aria-hidden="true"></i>
                    </a>
                </div>
                <p>The Hard List currently has:</p>
                <ul>
                    <li><b>{stats.map_count}</b> Maps</li>
                    <li><b>{stats.player_count}</b> Players</li>
                    <li style={{color: colorTypeChart['clear_no_video']}}><b>{stats.clear_count}</b> Total Clears</li>
                    <li style={{color: colorTypeChart['clear_collectables']}}><b>{stats.full_clear_count}</b> Full Clears</li>
                    <li style={{color: colorTypeChart['clear_golden']}}><b>{stats.golden_clear_count}</b> Deathless Clears</li>
                </ul>
            </section>  

            <div className="btn-container" style={{margin: "12px 0 12px 0"}}>
                <a title="Support me (and the website) on ko-fi.com" className="kofi-button" href="https://ko-fi.com/I2I013KDSG" target="_blank"> 
                    <span className="kofitext" style={{fontWeight: 700}}>
                        <img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="Ko-fi donations" className="kofiimg" />
                        Support me (and the website) on Ko-fi
                    </span>
                </a>
            </div>

            <section className="home-box">
                <h3 className="box-title2">
                    Important Links
                </h3>
                <ul>
                    <li><a href="https://discord.gg/qWz3QYpun5" style={{color: "rgb(114, 137, 218)"}}>Celeste's Hardest Maps List Discord</a></li>
                    <li><a href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit?gid=1904725075#gid=1904725075" style={{color: "rgb(0, 172, 71)"}}>Celeste's Hardest Maps Clear List Spreadsheet</a></li>
                    <li><a href="https://discord.gg/celeste" style={{color: "rgb(114, 137, 218)"}}>Celeste Discord</a></li>
                </ul>
                <h3 className="box-title2" style={{marginTop: "20px"}}>
                    List Moderators
                </h3>
                <div className="moderator-list">
                    <a href="/players/546" style={{color: "#d067a0"}}>10PercentPig</a>
                    <a href="/players/330" style={{color: "#a80085"}}>isabelle</a>
                    <a href="/players/543" style={{color: "#4cd54c"}}>Parrot Dash</a>
                    <a href="/players/160" style={{color: "#f8c222"}}>Dan</a>
                    <a href="/players/232" style={{color: "#4cd54c"}}>evelyncubes</a>
                    <a href="/players/331" style={{color: "#4a86e8"}}>IssyTAS</a>
                    <a href="/players/399" style={{color: "#FFF"}}>krzysieke</a>
                    <a href="/players/107" style={{color: "#48ed4f"}}>burgerhex</a>
                </div>
            </section>
        </div>
    );
};

export default Home;
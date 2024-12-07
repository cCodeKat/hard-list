import React, { useState, useEffect, useRef } from 'react';
import { borderColors, backgroundColors } from '../utils/colors';
import "css/main.css";
import "css/player_list.css";

interface Player {
    id: number;
    name: string;
}

interface PlayerResponse {
    results: Player[];
    next: string | null;
    previous: string | null;
}

const PlayerSearch: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [query, setQuery] = useState<string>('');
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [mapStyles] = useState(() => {
        const difficulty = Math.floor(Math.random() * 6) + 1;
        return {
            borderColor: borderColors[difficulty],
            backgroundColor: backgroundColors[difficulty],
        };
    });

    const fetchPlayers = async (url: string) => {
        try {
            const response = await fetch(url);
            const data: PlayerResponse = await response.json();

            setPlayers(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const searchUrl = `/api/players/?name=${encodeURIComponent(query)}`;
            fetchPlayers(searchUrl);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    useEffect(() => {
        fetchPlayers("/api/players/");
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [players]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleNavigation = (url: string | null) => {
        if (url) {
            fetchPlayers(url);
        }
    };

    return (
        <>
        <title>Players - Hardest Maps Clear List</title>
        <div id="main-container">
            <section id="player-box" style={{ backgroundColor: mapStyles.backgroundColor, border: `4px solid ${mapStyles.borderColor}` }}>
                <h1>Player Search</h1>
                <div id="player-search">
                    <input ref={inputRef} type="text" placeholder="Enter to search..." value={query} onChange={handleSearch} style={{ backgroundColor: mapStyles.backgroundColor, border: `4px solid ${mapStyles.borderColor}` }}/>
                </div>
                    <div id="player-pagination" style={{ backgroundColor: mapStyles.backgroundColor, border: `4px solid ${mapStyles.borderColor}` }}>
                        <ul id="selection-list">
                            {players.map((player) => (
                            <li key={player.id} style={{ backgroundColor: `color-mix(in srgb, ${mapStyles.borderColor}, 50% black)`, borderBottom: `1px solid ${mapStyles.backgroundColor}` }}>
                                <a className="playerBlock hover" href={`/players/${player.id}`}>
                                    {player.name}
                                </a>
                            </li>
                            ))}
                        </ul>
                        <div className="nav-button-container" style={{borderTop: `4px solid ${mapStyles.borderColor}`}}>
                            <button onClick={() => handleNavigation(prevPage)} disabled={!prevPage}>Previous</button>
                            <button onClick={() => handleNavigation(nextPage)} disabled={!nextPage}>Next</button>
                        </div>
                    </div>
            </section>
        </div>
        </>
    );
};

export default PlayerSearch;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'css/player.css';
import 'css/main.css';
import { borderColors, backgroundColors, colorTypeChart } from '../utils/colors';

type MapData = {
    id: number;
    title: string;
    author: string;
    difficulty: number;
    vidoe_href?: string;
    mod_href?: string;
    subtier: boolean;
}

type MapClear = {
    map: number;
    player: number;
    hasVideo: boolean;
    isFullClear: boolean;
    isGolden: boolean;
    isSilver: boolean;
    isCreator: boolean;
    clearProof: string;
    map_data: MapData;
};

type Player = {
  name: string;
  clears: MapClear[];
};

const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [clearCount, setClearCount] = useState(0);
  const [goldenCount, setGoldenCount] = useState(0);
  const [playerNameText, setPlayerNameText] = useState('');
  const [channelLink, setChannelLink] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/players/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const playerData = data;
          setPlayer(playerData);

          setPlayerNameText(playerData.player.name);
          setChannelLink(playerData.player.channel_href);

          let totalClearCount = 0;
          let totalGoldenCount = 0;
          playerData.clears.forEach((map: MapClear) => {
            if (map.isGolden === true) totalGoldenCount += 1;
            totalClearCount += 1;
          });
          setClearCount(totalClearCount);
          setGoldenCount(totalGoldenCount);
        });
    }
  }, [id]);

  const generateMapText = (map: MapClear, mapBorderColor: string) => {
    return (
        <React.Fragment>
        <a href={`/maps/${map.map_data.id}`} 
            style={{ color: colorTypeChart[
                map.isCreator && map.isGolden ? 'clear_secret' 
                : map.isGolden ? 'clear_golden' 
                : map.isSilver ? 'clear_silver'
                : map.isCreator ? 'clear_creator' 
                : !(map.hasVideo) ? 'clear_no_video'
                : map.isFullClear ? 'clear_collectables' 
                : 'clear_video'
        ] }}>
            {map.map_data.title}
        </a>
        <span style={{ color: mapBorderColor}}> | </span>
      </React.Fragment>
    );
  };

  const fillClearData = (player: Player, mapBorderColor: string) => {
    const starCounts = [0, 0, 0];
    const containerNodes: JSX.Element[][] = [[], [], []];
    
    player.clears.forEach((map: MapClear) => {
        starCounts[map.map_data.difficulty - 1] += 1;
        containerNodes[map.map_data.difficulty - 1].push(generateMapText(map, mapBorderColor));
    });

    return { starCounts, containerNodes };
  };

  const generatePlayer = (player: Player) => {
    const difficultyDict: number = 2*player.clears[0].map_data.difficulty - (player.clears[0].map_data.subtier ? 0 : 1);
    const mapBorderColor: string = borderColors[difficultyDict];
    const mapBackgroundColor: string = backgroundColors[difficultyDict];
    const { starCounts, containerNodes } = fillClearData(player, mapBorderColor);

    return (
      <div id="main-container">
        <title>{`${playerNameText} - Profile`}</title>
        <section id="player-box" style={{ backgroundColor: mapBackgroundColor, border: `4px solid ${mapBorderColor}` }}>
          <div className="title-box">
            <h1 id="player-title">
                <a href={channelLink}>
                    {playerNameText}
                </a>
            </h1>
            <div id="clear-stats-text">
              <h3>Clears: {clearCount}</h3>
              {goldenCount > 0 && <h3>Goldens: {goldenCount}</h3>}
            </div>
          </div>
          <hr style={{ borderColor: mapBorderColor }} />
          <div className="player-box">
            <h2>Player Stats</h2>
          </div>
          <div id="table-container" style={{ border: `4px solid ${mapBorderColor}` }}>
            <table id="player-table">
              <tbody style={{ backgroundColor: `color-mix(in srgb, ${mapBorderColor} 35%, black)` }}>
                <tr style={{ borderBottom: `4px solid ${mapBorderColor}` }}>
                  <th style={{ borderRight: `4px solid ${mapBorderColor}` }}>
                    <div className="star-container">
                      <div className="star" />
                    </div>
                  </th>
                  <th style={{ borderRight: `4px solid ${mapBorderColor}` }}>
                    <div className="star-container">
                      <div className="star" />
                      <div className="star" />
                    </div>
                  </th>
                  <th>
                    <div className="star-container">
                      <div className="star" />
                      <div className="star" />
                      <div className="star" />
                    </div>
                  </th>
                </tr>
                <tr>
                  <td id="1-star-value" style={{ borderRight: `4px solid ${mapBorderColor}` }}>
                    <h3>{starCounts[0]}</h3>
                  </td>
                  <td id="2-star-value" style={{ borderRight: `4px solid ${mapBorderColor}` }}>
                    <h3>{starCounts[1]}</h3>
                  </td>
                  <td id="3-star-value">
                    <h3>{starCounts[2]}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr style={{ borderColor: mapBorderColor }} />
          <div className="player-box">
            <h2>Map Clears</h2>
          </div>
          <div id="clear-section">
            {containerNodes[2].length > 0 && (
                <div id="3-star-container" className="map-container">
                <img src="/static/images/3star.svg" className="map-container-icon" />
                <div id="3-star-list" className="map-container-content">
                    {containerNodes[2].map((node, index) => (
                    <React.Fragment key={index}>{node}</React.Fragment>
                    ))}
                </div>
                </div>
            )}
            {containerNodes[1].length > 0 && (
            <div id="2-star-container" className="map-container">
                <img src="/static/images/2star.svg" className="map-container-icon" />
                <div id="2-star-list" className="map-container-content">
                    {containerNodes[1].map((node, index) => (
                    <React.Fragment key={index}>{node}</React.Fragment>
                    ))}
                </div>
                </div>
            )}
            {containerNodes[0].length > 0 && (
            <div id="1-star-container" className="map-container">
                <img src="/static/images/1star.svg" className="map-container-icon" />
                <div id="1-star-list" className="map-container-content">
                    {containerNodes[0].map((node, index) => (
                    <React.Fragment key={index}>{node}</React.Fragment>
                    ))}
                </div>
                </div>
            )}
          </div>
        </section>
      </div>
    );
  };

  return player ? generatePlayer(player) : <p>Loading...</p>;
};

export default PlayerPage;

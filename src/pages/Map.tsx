import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'css/level.css';
import 'css/main.css';
import { borderColors, backgroundColors } from '../utils/colors';
import { mapTitle } from '../utils/mapTitle';

interface ClearData {
    map: number;
    player_data: {
        id: number;
        name: string;
        channel_href?: string;
    };
    hasVideo: boolean;
    isFullClear: boolean;
    isGolden: boolean;
    isSilver: boolean;
    isCreator: boolean;
    clearProof: string;
}

interface MapData {
    id: number;
    title: string;
    author: string;
    difficulty: number;
    video_href: string;
    mod_href: string;
    subtier: boolean;
}

interface ApiResponse {
    map: MapData;
    clears: ClearData[];
}

const Map: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [mapData, setMapData] = useState<MapData | null>(null);
    const [clears, setClears] = useState<ClearData[]>([]);
    const [loading, setLoading] = useState(true);
    const [goldenCount, setGoldenCount] = useState(0);

    useEffect(() => {
        // Fetch map data
        fetch(`/api/maps/${id}`)
            .then((response) => response.json())
            .then((data: ApiResponse) => {
                setMapData(data.map);
                setClears(data.clears);
                
                const goldenClears: number = data.clears.filter((clear) => clear.isGolden).length;
                setGoldenCount(goldenClears);

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching map data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!mapData) {
        return <div>Error: Map data not found</div>;
    }

    const { title, author, video_href, mod_href } = mapData;

    const difficultyDict: number = 2*mapData.difficulty - (mapData.subtier ? 0 : 1);
    const mapBorderColor: string = borderColors[difficultyDict];
    const mapBackgroundColor: string = backgroundColors[difficultyDict];

    return (
        <div id="main-container">
            <title>{ title.concat(' by ', author) }</title>
            <meta name="og:title" content={title.concat(' by ', author)} />
            <meta name="og:description" content={`Difficulty: ${mapData.subtier ? "High" : "Low"} ${mapData.difficulty} Star\nClears: ${clears.length}`} />
            <section id="level-box" style={{ backgroundColor: mapBackgroundColor, border: `4px solid ${mapBorderColor}` }}>
                <h2 id="level-title">{ mapTitle(title) }</h2>
                <h3 id="level-author">by {author}</h3>
                <iframe
                    className="video-embed"
                    src={
                        video_href.includes('youtu')
                            ? `https://www.youtube.com/embed/${video_href.split('v=')[1]?.split('&')[0] || video_href.split('youtu.be/')[1]}`
                            : video_href.includes('bilibili.com') || video_href.includes('b23.tv')
                            ? `https://player.bilibili.com/player.html?bvid=${
                                  video_href.includes('b23.tv')
                                      ? video_href.split('b23.tv/')[1]?.split('?')[0]
                                      : video_href.match(/\/video\/([^/?]+)/)?.[1]
                              }&autoplay=false`
                            : ''
                    }
                    title="Video player"
                    style={{ border: `4px solid ${mapBorderColor}` }}
                    allowFullScreen={true}
                ></iframe>
                <h2 style={{marginTop: "12px"}}>{`Difficulty: ${mapData.subtier ? "High" : "Low"} ${mapData.difficulty} Star`}</h2>
                <div className="download-button">
                    <a
                        className="hover"
                        href={mod_href}
                        style={{ backgroundColor: mapBorderColor, border: `4px solid ${mapBorderColor}` }}
                    >
                        <span>Download Mod</span>
                        <i 
                            className="fa fa-download" 
                            style={{ margin: '4px 0px 0px 8px' }}
                        ></i>
                    </a>
                </div>
                <hr style={{ border: `1px solid ${mapBorderColor}` }}/>

            <h2>Clears: {clears.length}</h2>
            {goldenCount > 0 && <h2 style={{ fontSize: '125%' }}>Golden Strawberries: {goldenCount}</h2>}

            <div id="table-container" style={{ border: `4px solid ${mapBorderColor}` }}>
                <table id="map-table">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: mapBorderColor }}>Player</th>
                            <th style={{ backgroundColor: mapBorderColor }}>Clear Type</th>
                            <th style={{ backgroundColor: mapBorderColor }}>Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clears.map((clear, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${mapBorderColor}, 50% black)`,
                                }}
                            >
                                <td><a href={`/players/${clear.player_data.id}`}>{clear.player_data.name}</a></td>
                                <td>{
                                    clear.isCreator && clear.isGolden ? 'Creator & Golden' :
                                    clear.isGolden ? 'Golden Strawberry' :
                                    clear.isSilver ? 'Silver' :
                                    clear.isCreator ? 'Creator' :
                                    clear.isFullClear ? 'Full Clear' : 'Clear'
                                }</td>
                                <td>
                                    {clear.clearProof && (
                                        <a href={clear.clearProof} target="_blank" rel="noopener noreferrer">
                                            {clear.clearProof.includes('youtu') && 'YouTube'}
                                            {clear.clearProof.includes('twitch') && 'Twitch'}
                                            {clear.clearProof.includes('bilibili') && 'Bilibili'}
                                            {clear.clearProof.includes('discord') && 'Discord'}
                                            {!['youtu', 'twitch', 'bilibili', 'discord'].some((platform) =>
                                                clear.clearProof.includes(platform),
                                            ) && 'Other'}
                                            <i 
                                                className="fa fa-external-link" 
                                                style={{ margin: '4px 0px 0px 8px' }}
                                            ></i>
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
        </div>
    );
};

export default Map;
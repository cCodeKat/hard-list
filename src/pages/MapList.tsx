import React, { useEffect, useState } from 'react';
import 'css/main.css';
import 'css/list.css';
import { borderColors, backgroundColors } from '../utils/colors';
import { mapTitle } from '../utils/mapTitle';

interface MapData {
    id: number;
    title: string;
    author: string;
    difficulty: number;
    mod_href?: string;
    video_href?: string;
    subtier: boolean;
}

const Subdivider: React.FC<{ map: MapData }> = ({ map }) => {
    const difficultyDict: number = 2*map.difficulty - (map.subtier ? 0 : 1);
    const mapBorderColor1: string = borderColors[difficultyDict + 1];
    const mapBorderColor2: string = borderColors[difficultyDict];

    return (
        <hr style={{border: "3px solid", borderImage: `linear-gradient(90deg, ${mapBorderColor1} 0%, ${mapBorderColor2} 100%) 30`, width: "842.222px"}} />
    )
}

const Divider: React.FC<{ map: MapData }> = ({ map }) => {
    const difficultyDict: number = 2*map.difficulty - (map.subtier ? 0 : 1);
    const mapBorderColor: string = borderColors[difficultyDict];

    return (
        <section
            key={`divider-${map.id}`}
            className="panel divider"
            style={{
                border: `4px solid ${mapBorderColor}`,
                borderRadius: '6px',
            }}
        >
            {Array.from({ length: map.difficulty }).map((_, i) => (
                <div
                    key={i}
                    className="divider-star"
                    style={{ backgroundColor: mapBorderColor }}
                />
            ))}
        </section>
    );
}

const Panel: React.FC<{ map: MapData }> = ({ map }) => {
    const difficultyDict: number = 2*map.difficulty - (map.subtier ? 0 : 1)
    const mapBorderColor: string = borderColors[difficultyDict];
    const mapBackgroundColor: string = backgroundColors[difficultyDict];

    return (
        <section
            className="panel"
            style={{
                overflow: 'hidden',
                border: `4px solid ${mapBorderColor}`,
                borderRadius: '6px',
                backgroundColor: mapBackgroundColor,
            }}
        >
            <div className="panel-text">
                <div>
                    <a href={`/maps/${map.id}`}>
                        <h2>{mapTitle(map.title)}</h2>
                    </a>
                    <h3>{map.author}</h3>
                </div>
            </div>

            <div className="img-container">
                <div style={{ borderColor: mapBorderColor }}>
                    <a href={map.video_href || '#'}>
                        <img
                            src={`/static/images/thumbnails/${map.id}.webp`}
                            alt={map.title}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/static/images/thumbnails/image-not-found.webp';
                            }}
                            width={466.52}
                            height={160}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

const MapList: React.FC = () => {
    const [maps, setMaps] = useState<MapData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://13.60.36.31/api/maps/')
            .then((response) => response.json())
            .then((data) => {
                setMaps(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching map data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    let globalDifficulty: number = -1;
    let globalSubtier: boolean = true;

    return (
        <div id="main-container">
            <title>Maps - Hardest Maps Clear List</title>
            {maps.map((map) => {
                if (globalDifficulty !== map.difficulty) {
                    globalDifficulty = map.difficulty;
                    globalSubtier = map.subtier;

                    return [
                        <Divider key={map.id} map={map} />,
                        <Panel key={map.id} map={map} />,
                    ];
                } else if (globalSubtier !== map.subtier) {
                    globalSubtier = map.subtier;

                    return [
                        <Subdivider key={map.id} map={map} />,
                        <Panel key={map.id} map={map} />,
                    ];
                } else {
                    return <Panel key={map.id} map={map} />;
                }
            })}
        </div>
    );
};

export default MapList;

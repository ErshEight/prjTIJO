import React, { useState } from 'react';
import '../styles/_search.scss';
import { getSpotifyToken } from '../services/authSpotify';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [albumImages, setAlbumImages] = useState({});

    async function handleSearch(e) {
        e.preventDefault();
        const accessToken = await getSpotifyToken();
        const searchParams = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };

        try {
            const artistResponse = await axios.get('https://api.spotify.com/v1/search?q=' + query + '&type=artist,album', searchParams);
            const artistID = artistResponse.data.artists.items[0]?.id;
            if (!artistID) {
                setTracks([]);
                return;
            }

            const albumsResponse = await axios.get('https://api.spotify.com/v1/artists/' + artistID + '/albums', {
                ...searchParams,
                params: {
                    include_groups: 'album,single',
                    market: 'PL',
                    limit: 12,
                }
            });
            const albums = albumsResponse.data.items;
            const albumImageStuff = {};


            const tracksPromises = albums.map(async (album) => {
                albumImageStuff[album.id] = album.images[0]?.url || '';

                const tracksResponse = await axios.get('https://api.spotify.com/v1/albums/' + album.id + '/tracks', {
                    ...searchParams,
                    params: {
                        limit: 15
                    }
                });
                const albumTracks = tracksResponse.data.items.map(track => ({
                    ...track,
                    album
                }));
                return albumTracks;
            });

            const allTracks = await Promise.all(tracksPromises);
            const allTracksFlat = allTracks.flat();

            const uniqueTracks = [];
            const trackNames = new Set();

            allTracksFlat.forEach(track => {
                if (!trackNames.has(track.name)) {
                    uniqueTracks.push(track);
                    trackNames.add(track.name);
                }
            });

            const shuffleTracks = uniqueTracks.flat().sort(() => 0.5 - Math.random());
            const actualTracks = shuffleTracks.slice(0, 12);

            setTracks(actualTracks);
            setAlbumImages(albumImageStuff); // na ten moment najlepsze rozwiązanie do zdjęć albumu przy korzystaniu z całego albumu, innego dostępu nie ma do zdjęć

        } catch (error) {
            console.log('Fetch error:', error);
            setTracks([]);
        }
    };

    console.log(tracks);

    return (
        <div className="search-container">
            <h1>Wyszukaj utwory korzystając z nazwy artysty</h1>
            <form >
                <input
                    type="text"
                    placeholder="Wprowadź nazwę zespołu"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    required
                />
                <button onClick={handleSearch}>Wyszukaj</button>
            </form>
            <div className="tracks-list">
                {tracks.length > 0 ? (
                    tracks.map((track) => {
                        const album = track.album;
                        const albumImage = albumImages[album.id]; // dodanie zdjęcia
                        return (
                            <div key={track.id} className="track-item">
                                {albumImage && <img src={albumImage} alt={track.name} />}
                                <div>
                                    <p>{track.name}</p>
                                    <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Nie znaleziono utworów.</p>
                )}
            </div>
        </div>
    );
}

export default Search;
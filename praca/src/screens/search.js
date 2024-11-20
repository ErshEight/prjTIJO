import React, { useEffect, useState } from 'react';
import '../styles/_search.scss';

const clientID = "98c893f2038b4553aa5a87f5d9e93055";
const clientSecret = "f7a8f1654b2e4c049e9cd497be5d40f7";

function Search() {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret
        }
    
        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }, [])

    async function handleSearch(e) {
        e.preventDefault();
        const searchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        const artistID = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=artist', searchParams)
        .then(response => response.json())
        .then(data => { return data.artists.items[0].id })

        const musicTracks = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks' + '?market=PL', searchParams)
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            setTracks(data.tracks) 
        });
    };

    console.log(tracks);

    return (
        <div className="search-container">
            <h1>Wyszukaj utwory</h1>
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
                    tracks.map((track) => (
                        <div key={track.id} className="track-item">
                            <img src={track.album.images[0].url} />
                            <div>
                                <p>{track.name}</p>
                                <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nie znaleziono utworów.</p>
                )}
            </div>
        </div>
    );
}

export default Search;
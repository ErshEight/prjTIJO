import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/_search.scss';
import { getSpotifyToken } from '../services/authSpotify';
import axios from 'axios';

function RecommendSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    const accessToken = await getSpotifyToken();
    const searchParams = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    };

    try {
      const artistResponse = await axios.get(
        'https://api.spotify.com/v1/search?q=' + query + '&type=artist',
        searchParams
      );

      const artist = artistResponse.data.artists.items[0];
      const genres = artist?.genres || [];
      const artistID = artist?.id;

      if (genres.length === 0 || !artistID) {
        alert('Nie znaleziono gatunku dla tego artysty.');
        return;
      }

      navigate('/recommendresult', { state: { genres, artistID, accessToken } });
    } catch (error) {
      console.error('Recommend Search Fetch Error:', error);
    }
  }

  return (
    <div className="search-container">
      <h1>Wyszukaj rekomendacje zespołów</h1>
      <form>
        <input
          type="text"
          placeholder="Podaj swój ulubiony zespół"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button onClick={handleSearch}>Wyszukaj</button>
      </form>
    </div>
  );
}

export default RecommendSearch;
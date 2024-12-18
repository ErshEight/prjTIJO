import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/_recommendResult.scss';
import axios from 'axios';

function RecommendResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { genres, artistID: queryArtistID, accessToken } = location.state || {};
  const [currentRecommendation, setCurrentRecommendation] = useState(null);
  const [shownArtists, setShownArtists] = useState(new Set());

  useEffect(() => {
    if (genres?.length > 0) {
      fetchRecommendation();
    }
  }, [genres]);

  const fetchRecommendation = async () => {
    if (!genres || genres.length === 0 || !accessToken) return;

    const shuffledGenres = genres.sort(() => Math.random() - 0.5);
    const randomGenre = shuffledGenres[0];

    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/search?q=genre:' + randomGenre + '&type=track&limit=50',
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      const tracks = response.data.tracks.items;

      const filteredTracks = tracks.filter((track) => track.artists[0]?.id !== queryArtistID && !shownArtists.has(track.artists[0]?.id));

      if (filteredTracks.length > 0) {
        const randomTrack = filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
        setCurrentRecommendation(randomTrack);

        setShownArtists((prev) => new Set(prev).add(randomTrack.artists[0]?.id));
      } else {
        alert('Błąd, spróbuj wyszukać ponownie');
      }
    } catch (error) {
      console.error('Recommend Result Fetch Error:', error);
    }
  };

  const handleReturn = () => {
    navigate('/recommendsearch');
  };

  if (!currentRecommendation) {
    return <div>Brak rekomendacji.</div>;
  }

  const { artists, name: trackName, album, id: trackId } = currentRecommendation;
  const artistName = artists[0]?.name || 'Nieznany artysta';
  const albumImage = album.images[0]?.url || '';

  // EMBEDS iFrame
  const embedURL = 'https://open.spotify.com/embed/track/' + trackId;

  return (
    <div className="recommend-result-container">
      <h1>Rekomendacja: {artistName}</h1>
      <div className="recommend-result">
        {albumImage && <img src={albumImage} alt={trackName} />}
        <div className="recommend-details">
          <h2>{artistName}</h2>
          <p>{trackName}</p>
        </div>
        <div className="spotify-embed">
          <iframe
            src={embedURL}
            allow="encrypted-media"
            title="Spotify Embed"
          ></iframe>
        </div>
        <div className="buttons-container">
          <button onClick={fetchRecommendation} className="next-recommendation-button">
            Kolejna rekomendacja
          </button>
          <button onClick={handleReturn} className="return-button">
            Wróć do wyszukiwania
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecommendResult;
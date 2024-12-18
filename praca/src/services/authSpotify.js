const clientID = "98c893f2038b4553aa5a87f5d9e93055";
const clientSecret = "fd7a270ec0b644bd93485a6cbb200ce4";

let accessToken = null;

const getSpotifyToken = async () => {
    if (accessToken) return accessToken;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret,
    });

    const data = await response.json();
    accessToken = data.access_token;
    setTimeout(() => {
        accessToken = null;
    }, data.expires_in * 1000);

    return accessToken;
};

module.exports = { getSpotifyToken };
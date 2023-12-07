let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check for access token in the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      // Clear parameters from the URL
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // Update the URL without access token

      return accessToken;
    } else {
      return null;
    }
  },

  login() {
    const redirectUri = 'http://localhost:3000/'; // Update with your app's redirect URI
    const scope = 'user-read-private user-read-email'; // Add necessary scopes

    window.location.href = `https://accounts.spotify.com/authorize?client_id=4fa25218ecac4737b7656017e838890f&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
  },

  logout() {
    accessToken = null;
  },

  isLoggedIn() {
    return !!accessToken;
  },
};

export default Spotify;
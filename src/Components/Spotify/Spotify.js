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
    const redirectUri = 'http://localhost:3000/';
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

    window.location.href = `https://accounts.spotify.com/authorize?client_id=4fa25218ecac4737b7656017e838890f&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
  },

  logout() {
    accessToken = null;
  },

  isLoggedIn() {
    return !!accessToken;
  },

  async getUserInfo() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        return userInfo;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }

    return null;
  },

  async getUserId() {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.id;
      } else {
        console.error('Failed to get user ID');
        return null;
      }
    } catch (error) {
      console.error('Error in getUserId:', error);
      return null;
    }
  },

  async savePlaylist(playlistTitle, trackURIs) {
    try {
      const accessToken = this.getAccessToken();

      if (!accessToken) {
        console.error('Access token not available');
        return;
      }

      // Step 1: Create a new playlist
      const userId = await this.getUserId();
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistTitle,
          public: false, // You can set this to true if you want the playlist to be public
        }),
      });

      if (!createPlaylistResponse.ok) {
        console.error('Failed to create playlist');
        return;
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // Step 2: Add tracks to the new playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackURIs,
        }),
      });

      if (!addTracksResponse.ok) {
        console.error('Failed to add tracks to the playlist');
        return;
      }

      console.log('Playlist saved successfully!');
    } catch (error) {
      console.error('Error in savePlaylist:', error);
    }
  },
  
};

export default Spotify;
import './App.css';
import React, { useState, useEffect } from "react";
import Spotify from './components/Spotify/Spotify';
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';
import { FaSpotify } from "react-icons/fa";
import Wrapper from './components/Wrapper/Wrapper';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Spotify.getAccessToken();
      setLoggedIn(!!token);

      if (token) {
        const user = await Spotify.getUserInfo();
        setUserInfo(user);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    Spotify.login();
    setLoggedIn(true);
  };

  const handleLogout = () => {
    Spotify.logout();
    setLoggedIn(false);
    setUserInfo(null);
  };

  // State to hold the track data
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (selectedTrack) => {
    const isTrackInPlaylist = playlist.some((track) => track.id === selectedTrack.id);

    if (!isTrackInPlaylist) {
      setPlaylist([...playlist, selectedTrack]);
    }
  };

  const removeFromPlaylist = (trackId) => {
    const updatedPlaylist = playlist.filter((track) => track.id !== trackId);
    setPlaylist(updatedPlaylist);
  }

  const updatePlaylistTitle = (e) => {
    setPlaylistTitle(e.target.value);
  }

  const handleSearch = async (searchTerm) => {
    try {
      const accessToken = Spotify.getAccessToken();

      if (!accessToken) {
        console.error('Access token not available');
        return;
      }

      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Extract relevant track information
        const tracks = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map((artist) => artist.name).join(', '),
          album: track.album.name,
          uri: track.uri,
        }));

        setSearchResults(tracks);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
    }
  };

  return (
    <div className='background-image'>
      <header className="headline">Jam🎶ming</header>
      {loggedIn ? (
        <>
          <div id='login-container' className="container">
            <Wrapper minWidth='500px'>
              <div className="user-card">
                {userInfo?.images && userInfo.images.length > 0 && (
                  <img src={userInfo.images[0].url} alt="User Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                )}
                <h2>{userInfo?.display_name}</h2>
                <button className='big-btn logout-btn' onClick={handleLogout}>Logout</button>
              </div>
            </Wrapper>
          </div>
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="content-table">
            <TrackList searchResults={searchResults} addToPlaylist={addToPlaylist} />
            <Playlist
              playlist={playlist}
              playlistTitle={playlistTitle}
              setPlaylistTitle={setPlaylistTitle}
              removeFromPlaylist={removeFromPlaylist}
              updatePlaylistTitle={updatePlaylistTitle}
            />
          </div>
        </>
      ) : (
        <div className="container">
          <Wrapper minWidth='500px'>
            <div className="login-info">
              <button className='big-btn' onClick={handleLogin}>
                <FaSpotify style={{ fontSize: '24px', paddingRight: "6px" }} /> Login with Spotify
              </button>
              <p className="login-desc">Please login to get access to Spotify content.</p>
              <p className="login-desc-small">You will automatically be redirected to this page after login.</p>
            </div>
          </Wrapper>
        </div>
      )}
    </div>
  );
}

export default App;
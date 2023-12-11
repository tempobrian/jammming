import './App.css';
import React, { useState, useEffect } from "react";
import Spotify from './components/Spotify/Spotify';
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';
import { FaSpotify } from "react-icons/fa";
import Wrapper from './components/Wrapper/Wrapper';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
  const [playlistTitle, setPlaylistTitle] = useState('My Playlist');
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

  const savePlaylist = () => {
    const trackURIs = playlist.map((track) => track.uri);
    setPlaylist([])
    // Log or send track URIs to the server (for testing, replace with Spotify API calls later)
    console.log('Track URIs:', trackURIs);
  };


  const updatePlaylistTitle = (e) => {
    setPlaylistTitle(e.target.value);
  }

  return (
    <div>
      <div className='background-image'>
        <header className="headline">Jam🎶ming</header>

        <div id='login-container'>
          <Wrapper minWidth='500px'>

            {loggedIn ? (
              <div className="user-card">
                {userInfo?.images && userInfo.images.length > 0 && (
                  <img src={userInfo.images[0].url} alt="User Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                )}
                <h2>{userInfo?.display_name}</h2>
                <button className='big-btn logout-btn' onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="login-info">
                <button className='big-btn' onClick={handleLogin} ><FaSpotify style={{ fontSize: '24px', paddingRight: "6px" }} /> Login with Spotify</button>
                <p className="login-desc">Please login to get access to  spotify content.</p>
                <p className="login-desc-small">You will automatically be redirected to this page after login.</p>
              </div>
            )}

          </Wrapper>

        </div>

        <div className="content-table">
          <TrackList addToPlaylist={addToPlaylist} />
          <Playlist
            playlist={playlist}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            removeFromPlaylist={removeFromPlaylist}
            savePlaylist={savePlaylist}
            updatePlaylistTitle={updatePlaylistTitle}
          />
        </div>
      </div>
    </div >
  )
}

export default App;
import './App.css';
import React, { useState, useEffect } from "react";
import Spotify from './components/Spotify/Spotify';
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Spotify.getAccessToken();
    setLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    Spotify.login();
    setLoggedIn(true);
  };

  const handleLogout = () => {
    Spotify.logout();
    setLoggedIn(false);
  }

  // Hardcoded array of track objects
  const hardcodedTracks = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    // Add more tracks as needed
  ];

  // State to hold the track data
  const [playlistTitle, setPlaylistTitle] = useState('My Playlist');
  const [trackData, setTrackData] = useState(hardcodedTracks);
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


  const updatePlaylistTitle = (newTitle) => {
    setPlaylistTitle(newTitle);
  }

  return (
    <div>
      <div className='background-image'>
        <header className="headline">Jam🎶ming</header>
        <h1>{loggedIn ? 'Logged In' : 'Not Logged In'}</h1>
        <button onClick={loggedIn ? handleLogout : handleLogin}>
          {loggedIn ? 'Logout' : 'Login with Spotify'}
        </button>
        <div className="content-table">
          <TrackList tracks={trackData} addToPlaylist={addToPlaylist} />
          <Playlist
            playlist={playlist}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            removeFromPlaylist={removeFromPlaylist}
            savePlaylist={savePlaylist}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
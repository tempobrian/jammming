import './App.css';
import React, { useEffect, useState } from "react";
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';

function App() {
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const [searchKey, setSearchKey] = useState("")
  // Hardcoded array of track objects
  const hardcodedTracks = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    // Add more tracks as needed
  ];

  // State to hold the track data
  const [trackData, setTrackData] = useState(hardcodedTracks);
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (selectedTTrack) => {
    const isTrackInPlaylist = playlist.some((track) => track.id === selectedTTrack.id);

    if (!isTrackInPlaylist) {
      setPlaylist([...playlist, selectedTTrack]);
    }
  };

  return (
    <div>
      <div className='background-image'>
        <h1 className="headline">Jam🎶ming</h1>
        <TrackList tracks={trackData} addToPlaylist={addToPlaylist} />
        <Playlist playlist={playlist} />
      </div>
    </div>
  )
}

export default App;
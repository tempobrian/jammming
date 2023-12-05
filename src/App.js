import './App.css';
import React, {useEffect, useState} from "react";
import TrackList from './components/TrackList/TrackList';

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

  return (
    <div>
     <div className='background-image'>
      <h1 className="headline">Jam🎶ming</h1>
      <TrackList tracks={trackData} />
     </div>
    </div>
  )
}

export default App;
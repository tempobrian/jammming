import React from 'react';

const SearchResults = ({ results, addToPlaylist }) => {
  return (
    <ul>
      {results.map((track) => (
        <li key={track.id}>
          <strong>{track.name}</strong> by {track.artist} from the album {track.album}
          <button onClick={() => addToPlaylist(track)}>+</button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
import React from 'react';
import Wrapper from '../Wrapper/Wrapper';

const SearchResults = ({ results, addToPlaylist }) => {

  if (!results?.length) {
    return (<Wrapper>
      no search results.
    </Wrapper>)
  }
  return (
    <Wrapper>
      <ul>
        {!!results?.length && results.map((track) => (
          <li key={track.id}>
            <div>
              <strong>{track.name}</strong>
              <p className="artist">{track.artist} from the album {track.album}</p>
            </div>
            <button className="small-btn" onClick={() => addToPlaylist(track)}>+</button>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SearchResults;
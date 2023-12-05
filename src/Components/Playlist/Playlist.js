import React from "react";

const Playlist = ({ playlist }) => {
    return (
        <div>
            <h2>Playlist</h2>
            <ul>
                {playlist.map((track) => (
                    <li key={track.id}>
                        <strong>{track.name}</strong> by {track.artist} from the album {track.album}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
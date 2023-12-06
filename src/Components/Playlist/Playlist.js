import React from "react";
import Input from "../Input/Input";

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist, setPlaylistTitle, savePlaylist }) => {
	return (
		<div>
			<Input value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} />
			<ul>
				{playlist.map((track) => (
					<li key={track.id}>
						<strong>{track.name}</strong> by {track.artist} from the album {track.album}
						<button onClick={() => removeFromPlaylist(track.id)}>-</button>
					</li>
				))}
			</ul>
			<button onClick={savePlaylist}>Save Playlist</button>
		</div>
	);
};

export default Playlist;
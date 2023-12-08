import React from "react";
import Input from "../Input/Input";

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist, updatePlaylistTitle, savePlaylist }) => {
	return (
		<div>
			<Input value={playlistTitle} onChange={updatePlaylistTitle} />
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
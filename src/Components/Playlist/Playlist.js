import React from "react";
import Input from "../Input/Input";

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist, setPlaylistTitle }) => {
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
		</div>
	);
};

export default Playlist;
import React from "react";

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist }) => {
	return (
		<div>
			<h2>{playlistTitle}</h2>
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
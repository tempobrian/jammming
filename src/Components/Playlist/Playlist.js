import React from "react";
import Input from "../Input/Input";
import Wrapper from "../Wrapper/Wrapper";

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist, updatePlaylistTitle, savePlaylist }) => {
	return (
		<Wrapper>
			<Input value={playlistTitle} onChange={updatePlaylistTitle} />
			<ul>
				{playlist.map((track) => (
					<li key={track.id}>
						<div>
							<strong>{track.name}</strong><p className="artist">{track.artist} | {track.album}</p>
						</div>

						<button className="small-btn" onClick={() => removeFromPlaylist(track.id)}> - </button>
					</li>
				))}
			</ul>
			<button onClick={savePlaylist}>Save Playlist</button>
		</Wrapper>
	);
};

export default Playlist;
import React from "react";
import Input from "../Input/Input";
import Wrapper from "../Wrapper/Wrapper";
import Spotify from "../Spotify/Spotify";

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist, updatePlaylistTitle }) => {

	const handleSaveToSpotify = async () => {
		const trackURIs = playlist.map((track) => track.uri);

		if (playlistTitle && trackURIs.length > 0) {
			await Spotify.savePlaylist(playlistTitle, trackURIs);
			// Optionally, you can clear the playlist or perform other actions after saving
		} else {
			console.error('Please provide a playlist name and add tracks to the playlist');
		}
	};

	return (
		<Wrapper >
			<Input type="text" placeholder="Enter playlist name" value={playlistTitle} onChange={updatePlaylistTitle} />
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
			<button onClick={handleSaveToSpotify}>Save To Spotify</button>
		</Wrapper>
	);
};

export default Playlist;
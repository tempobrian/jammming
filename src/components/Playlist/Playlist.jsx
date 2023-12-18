import React from "react";
import Input from "../Input/Input";
import Wrapper from "../Wrapper/Wrapper";
import Button from "../Button/Button";
import spotify from "../../stores/spotify";
import { MinusSign } from "../Icons/Icons";
import { Row, Col, Container } from '../Flexbox/Flexbox';

const Playlist = ({ playlist, playlistTitle, removeFromPlaylist, updatePlaylistTitle }) => {

	const handleSaveToSpotify = async () => {
		const trackURIs = playlist.map((track) => track.uri);

		if (playlistTitle && trackURIs.length > 0) {
			await spotify.savePlaylist(playlistTitle, trackURIs);
			// Optionally, you can clear the playlist or perform other actions after saving
		} else {
			console.error('Please provide a playlist name and add tracks to the playlist');
		}
	};

	return (
		<Container>
			<Row>
				<Wrapper >
					<Input type="text" placeholder="Enter playlist name" value={playlistTitle} onChange={updatePlaylistTitle} />
					<ul>
						{playlist.map((track) => (
							<li key={track.id}>
								<div>
									<strong>{track.name}</strong><p className="artist">{track.artist} | {track.album}</p>
								</div>

								<MinusSign className="small-btn" onClick={() => removeFromPlaylist(track.id)} />
							</li>
						))}
					</ul>
					<Button color="secondary" onClick={handleSaveToSpotify}>Save To Spotify</Button>
				</Wrapper>
			</Row>
		</Container>
	);
};

export default Playlist;
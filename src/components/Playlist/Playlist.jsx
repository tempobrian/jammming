import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import spotify from "../../stores/spotify";
import { MinusSign } from "../Icons/Icons";
import { Row, Col } from '../Flexbox/Flexbox';
import { List, ListItem } from "../List/List"

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
		<>
			<Input type="text" placeholder="Enter playlist name" value={playlistTitle} onChange={updatePlaylistTitle} />

			<List>
				{playlist.map((track) => (

					<ListItem key={track.id}>
						<Row>
							<Col>
								<strong>{track.name}</strong><p>{track.artist} From the album {track.album}</p>
							</Col>
							<Col columns={1}>
								<MinusSign className="small-btn" onClick={() => removeFromPlaylist(track.id)} />
							</Col>
						</Row>
					</ListItem>
				))}
			</List>

			<Button color="secondary" onClick={handleSaveToSpotify}>Save To Spotify</Button>

		</>
	);
};

export default Playlist;
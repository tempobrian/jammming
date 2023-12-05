import React from "react";

const TrackList = ({ tracks }) => {
	return (
		<div>
			<h2>Track Listing</h2>
			<ul>
				{tracks.map((track) => {
					return (
						<li key={track.id}>
							<strong>{track.name}</strong> by {track.artist} from the album {track.album}
						</li>)
				})}
			</ul>
		</div>
	);
};

export default TrackList;
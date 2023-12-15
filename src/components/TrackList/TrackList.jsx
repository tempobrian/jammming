import React, { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

const TrackList = ({ searchResults, addToPlaylist }) => {

	return (
		<div>
			<SearchResults results={searchResults} addToPlaylist={addToPlaylist} />
		</div>
	);
};

export default TrackList;
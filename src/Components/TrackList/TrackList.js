import React, { useState } from "react";
import Spotify from "../Spotify/Spotify";
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";

const TrackList = ({ searchResults, addToPlaylist }) => {

	return (
		<div>
			<SearchResults results={searchResults} addToPlaylist={addToPlaylist} />
		</div>
	);
};

export default TrackList;
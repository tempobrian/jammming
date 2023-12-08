import React, { useState } from "react";
import Spotify from "../Spotify/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

const TrackList = ({ addToPlaylist }) => {
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async (searchTerm) => {
		try {
			const accessToken = Spotify.getAccessToken();

			if (!accessToken) {
				console.error('Access token not available');
				return;
			}

			const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				const data = await response.json();

				// Extract relevant track information
				const tracks = data.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists.map((artist) => artist.name).join(', '),
					album: track.album.name,
					uri: track.uri,
				}));

				setSearchResults(tracks);
			} else {
				console.error('Failed to fetch search results');
			}
		} catch (error) {
			console.error('Error in handleSearch:', error);
		}
	};

	return (
		<div>
			<SearchBar onSearch={handleSearch} />
			<SearchResults results={searchResults} addToPlaylist={addToPlaylist} />
		</div>
	);
};

export default TrackList;
import React, { useState, useEffect } from "react";
import { ThemeProvider } from 'styled-components';
import spotify from "./stores/spotify";
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';
import { SpotifyIcon } from "./components/Icons/Icons";
import Wrapper from './components/Wrapper/Wrapper';
import SearchBar from './components/SearchBar/SearchBar';
import theme from './theme';
import './App.css';
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import BackgroundImage from './components/BackgroundImage/BackgroundImage'
import { Container, Row, Col } from './components/Flexbox/Flexbox'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = spotify.getAccessToken();
      setLoggedIn(!!token);

      if (token) {
        const user = await spotify.getUserInfo();
        setUserInfo(user);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    spotify.login();
    setLoggedIn(true);
  };

  const handleLogout = () => {
    spotify.logout();
    setLoggedIn(false);
    setUserInfo(null);
  };

  // State to hold the track data
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (selectedTrack) => {
    const isTrackInPlaylist = playlist.some((track) => track.id === selectedTrack.id);

    if (!isTrackInPlaylist) {
      setPlaylist([...playlist, selectedTrack]);
    }
  };

  const removeFromPlaylist = (trackId) => {
    const updatedPlaylist = playlist.filter((track) => track.id !== trackId);
    setPlaylist(updatedPlaylist);
  }

  const updatePlaylistTitle = (e) => {
    setPlaylistTitle(e.target.value);
  }

  const handleSearch = async (searchTerm) => {
    try {
      const accessToken = spotify.getAccessToken();

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
    <ThemeProvider theme={theme}>
      <BackgroundImage>
        <Header>Jam🎶ming</Header>
        <Container>
          {loggedIn ? (
            <>
              <Row centerRow>
                <Col columns={3} center>
                  <Wrapper>
                    {userInfo?.images && userInfo.images.length > 0 && (
                      <img src={userInfo.images[0].url} alt="User Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    )}
                    <h2>{userInfo?.display_name}</h2>
                    <Row centerRow>
                      <Button color="danger" rounded={true} onClick={handleLogout}>Logout</Button>
                    </Row>
                  </Wrapper>
                </Col>
              </Row>
              <Row centerRow>
                <Col columns={3}>
                  <SearchBar onSearch={handleSearch} />
                </Col>
              </Row>
              <Row>
                <Col columns={6}>
                  <TrackList searchResults={searchResults} addToPlaylist={addToPlaylist} />
                </Col>
                <Col columns={6}>
                  <Playlist
                    playlist={playlist}
                    playlistTitle={playlistTitle}
                    setPlaylistTitle={setPlaylistTitle}
                    removeFromPlaylist={removeFromPlaylist}
                    updatePlaylistTitle={updatePlaylistTitle}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <Row centerRow>
              <Col columns={5} center>
                <Wrapper>
                  <Row centerRow>
                    <Button color="success" rounded={true} onClick={handleLogin}>
                      <SpotifyIcon /> Login with Spotify
                    </Button>
                  </Row>
                  <p>Please login to get access to Spotify content.</p>
                  <p>You will automatically be redirected to this page after login.</p>
                </Wrapper>
              </Col>
            </Row>
          )}
        </Container>
      </BackgroundImage>
    </ThemeProvider >
  );
}

export default App;
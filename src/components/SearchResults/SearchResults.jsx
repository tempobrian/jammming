import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import { Row, Col, Container } from '../Flexbox/Flexbox';
import { PlusSign } from '../Icons/Icons';

const SearchResults = ({ results, addToPlaylist }) => {

  if (!results?.length) {
    return (<Wrapper>
      Search for a song, artist or album.
    </Wrapper>)
  }
  return (

    <Container>
      <Row centerRow>
        <Wrapper>

          <ul>
            {!!results?.length && results.map((track) => (
              <li key={track.id}>
                <Row justify-content="space-between">
                  <Col>
                    <div>
                      <strong>{track.name}</strong>
                      <p className="artist">{track.artist} from the album {track.album}</p>
                    </div>
                  </Col>
                  <Col>
                    <PlusSign onClick={() => addToPlaylist(track)} />
                  </Col>
                </Row>
              </li>


            ))}
          </ul>

        </Wrapper>
      </Row>
    </Container >

  );
};

export default SearchResults;
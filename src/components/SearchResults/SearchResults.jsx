import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import { Row, Col } from '../Flexbox/Flexbox';
import { PlusSign } from '../Icons/Icons';
import { List, ListItem } from '../List/List'
import Text from '../Text/Text';

const SearchResults = ({ results, addToPlaylist }) => {

  if (!results?.length) {
    return (<>
      Search for a song, artist or album.
    </>
    )
  }
  return (
    <List>
      {!!results?.length && results.map((track) => (
        <ListItem key={track.id}>
          <Row centerRow>
            <Col>
              <Text weight="bold">{track.name}</Text>
              <Text color="artist" weight="bold" >{track.artist} from {track.album}</Text>
            </Col>
            <Col columns={1}>
              <PlusSign onClick={() => addToPlaylist(track)} />
            </Col>
          </Row>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;
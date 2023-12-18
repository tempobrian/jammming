import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Row } from '../Flexbox/Flexbox';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for a song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Row centerRow>
        <Button rounded color="primary" onClick={handleSearch}>Search</Button>
      </Row>
    </div>
  );
};

export default SearchBar;
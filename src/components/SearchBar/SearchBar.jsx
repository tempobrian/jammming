import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Container, Row, Col } from '../Flexbox/Flexbox';


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
      <Button color="primary" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
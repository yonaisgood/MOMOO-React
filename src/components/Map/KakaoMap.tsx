import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

// import Close from '../../asset/icon/X.svg';

function KakaoMap() {
  const [state, setState] = useState({
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    isPanto: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('');

  const handleSearch = () => {
    if (searchQuery) {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(searchQuery, handlePlacesSearch);
    }
  };

  const handlePlacesSearch = (data: any[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const newSearch = data[0];
      const newPosition = { lat: newSearch.y, lng: newSearch.x };
      setState((prevState) => ({
        ...prevState,
        center: newPosition,
      }));
      setSearchedKeyword(searchQuery);

      console.log('검색된 위치 정보:', newPosition);
    }
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <MapContainer>
      <SearchHead>
        <input
          onChange={handleSearchQueryChange}
          onKeyDown={handleKeyDown}
          value={searchQuery}
          placeholder="주소 또는 키워드 입력해 주세요"
        />
      </SearchHead>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{
          width: '100%',
          aspectRatio: 1 / 1,
        }}
        level={3}
      >
        <MapMarker position={state.center}></MapMarker>
      </Map>
    </MapContainer>
  );
}

const SearchHead = styled.div`
  display: flex;
  background-color: var(--background-color);
  padding: 1.3rem 1.6rem;
`;

const MapContainer = styled.div`
  width: 100%;
  font-size: var(--text-m);
  color: var(--gray-700);

  input {
    width: 100%;

    outline: none;
    background-color: var(--background-color);
  }
`;

export default KakaoMap;

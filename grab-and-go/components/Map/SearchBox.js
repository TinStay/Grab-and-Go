import React from 'react'
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const SearchBox = ({onSearchBoxMounted, onPlacesChanged}) => {
    return (
        <StandaloneSearchBox
          ref={onSearchBoxMounted}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for places"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `280px`,
              height: `40px`,
              padding: `0 18px`,
              borderRadius: `4px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.35)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </StandaloneSearchBox>
    )
}

export default SearchBox

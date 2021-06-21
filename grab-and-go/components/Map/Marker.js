import React from "react";
import { Marker } from "react-google-maps";

const MapMarker = ({ location, userMarker, onClick }) => {
  return (
    <Marker
      position={{ lat: location.lat, lng: location.lng }}
      // Disable info window for user markers
      onClick={userMarker ? () => {} : (e) => onClick(e, location)}
      icon={{
        url: userMarker ? "/images/userPointer.svg" : "/images/pointer.svg",
        scaledSize: new window.google.maps.Size(45, 50),
      }}
    />
  );
};

export default MapMarker;

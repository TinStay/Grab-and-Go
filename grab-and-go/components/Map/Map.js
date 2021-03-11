import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

const Map = (props) => {
  const [userPosition, setUserPosition] = useState();

  useEffect(() => {
    // Get location of user
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  return (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: 51.44083, lng: 5.47778 }}>
      {userPosition && (
        <Marker position={{ lat: userPosition.lat, lng: userPosition.lng }} />
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));

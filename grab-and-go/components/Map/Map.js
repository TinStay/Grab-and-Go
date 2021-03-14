import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { locationList } from "../../assets/locationList";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

const Map = (props) => {
  // State
  const [userPosition, setUserPosition] = useState();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState();

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
      console.log("Geolocation Not Available");
    }

    // // Push data to a new object array
    // let allLocations = [];

    // // Connect to Google key
    // Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_KEY);

    // let promises = [];

    // locationList.map((place) => {
    //   promises.push(Geocode.fromAddress(place.address));

    // });

    // Promise.all(promises).then(
    //     (newLocations) => {
    //       newLocations.map((location) => {
    //         //   console.log('location', location)
    //         const { lat, lng } = location.results[0].geometry.location;
    //         // Update coordinates
    //         location = { ...location, lat: lat, lng: lng };

    //         allLocations.push(location);
    //       });
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );

    setStores(locationList);

    // // Get latitude and longitude from address
    // await Geocode.fromAddress(place.address).then(
    //     (response) => {
    //       const { lat, lng } = response.results[0].geometry.location;
    //       // Update coordinates
    //       place = {...place, lat: lat, lng: lng}

    //       allLocations.push(place);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    //   setLocations(allLocations);
  }, []);


  return (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: 51.44083, lng: 5.47778 }}>
      {userPosition && (
        <Marker position={{ lat: userPosition.lat, lng: userPosition.lng }} />
      )}
      {stores &&
        stores.map((store, idx) => (
          <Marker
            key={idx}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => setSelectedStore(store)}
          />
        ))}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));

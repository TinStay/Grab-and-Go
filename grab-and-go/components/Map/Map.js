import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import {Button, makeStyles, Typography} from '@material-ui/core'
import { locationList } from "../../assets/locationList";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./mapStyles";
import classes from '../../styles/Home.module.scss'

const useStyles = makeStyles(theme => ({
  infoWindowButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    }
  }
}))

const Map = (props) => {
  // State
  const [userPosition, setUserPosition] = useState();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  const styles = useStyles()

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
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 51.44083, lng: 5.47778 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {userPosition && (
        <Marker
          position={{ lat: userPosition.lat, lng: userPosition.lng }}
          icon={{
            url: "/images/userPointer.svg",
            scaledSize: new window.google.maps.Size(45, 50),
            
          }}
        />
      )}
      {stores &&
        stores.map((store, idx) => (
          <Marker
            key={idx}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => setSelectedStore(store)}
            icon={{
              url: "/images/pointer.svg",
              scaledSize: new window.google.maps.Size(45, 50),
            }}
          />
        ))}
      {selectedStore && (
        <InfoWindow
          position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
          onCloseClick={() => setSelectedStore(null)}
         
        >
          <div className={classes.info_window}>
            <h4 className={classes.info_window_heading}> {selectedStore.name}</h4>
            <p>{selectedStore.address}</p>
            <Button className={styles.infoWindowButton} variant="contained" color="primary" fullWidth>
              View products
            </Button>
           
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));

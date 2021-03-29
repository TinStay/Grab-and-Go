import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { locationList } from "../../assets/locationList";
import { useStoreContext, useUpdateStoreContext } from "../../context";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./mapStyles";
import classes from "../../styles/Home.module.scss";

const useStyles = makeStyles((theme) => ({
  infoWindowButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const Map = (props) => {
  // State
  const [userPosition, setUserPosition] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [stores, setStores] = useState([]);
  const [markerMap, setMarkerMap] = useState({});
  // const [selectedStore, setSelectedStore] = useState(null);

  const {selectedStore, setSelectedStore} = useStoreContext();

  const styles = useStyles();
  const router = useRouter();

  console.log(`selectedStore`, selectedStore);

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

  const markerLoadHandler = (marker, store) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [store.id]: marker };
    });
  };

  const handleMarkerClick = (e, store) =>{
    setSelectedStore(store)
    setShowInfo(true)
  }

  console.log(`selectedStore`, selectedStore)

  const goToStorePage = (e, href) => {
    // e.preventDefault()
    router.push(href);
  };

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
            onLoad={marker => markerLoadHandler(marker, store)}
            onClick={(e) => handleMarkerClick(e, store)}
            icon={{
              url: "/images/pointer.svg",
              scaledSize: new window.google.maps.Size(45, 50),
            }}
          />
        ))}
      {showInfo && selectedStore && (
        <InfoWindow
        // options={{pixelOffset: new google.maps.Size(0,-30)}}
        // anchor={markerMap[selectedStore.id]}
          position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
          onCloseClick={() => setShowInfo(false)}
        >
          <div className={classes.info_window}>
            <h4 className={classes.info_window_heading}>
              {" "}
              {selectedStore.name}
            </h4>
            <p>{selectedStore.address}</p>
            <a onClick={(e) => goToStorePage(e, `store/${selectedStore.name}`)}>
              <Button
                className={styles.infoWindowButton}
                variant="contained"
                color="primary"
                fullWidth
                // onClick={e => e.preventDefault()}
              >
                View products
              </Button>
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));

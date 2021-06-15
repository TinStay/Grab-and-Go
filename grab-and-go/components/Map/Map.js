import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useStoreContext } from "../../context";
import { locationList } from "../../assets/locationList";
import classes from "../../styles/Home.module.scss";
import TravelModeSelect from './TravelModeSelect'

// Material UI
import {
  Button,
  makeStyles,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import mapStyles from "./mapStyles";

// Google maps
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
  DirectionsRenderer,
} from "react-google-maps";
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const useStyles = makeStyles((theme) => ({
  infoWindowButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  infoWindowButtonUnderlined: {
    color: theme.palette.secondary.main,
    borderRadius: "50px",
  },
}));

const Map = ({ filteredStores }) => {
  // State
  const [userPosition, setUserPosition] = useState();
  const [directions, setDirections] = useState();
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [center, setCenter] = useState({ lat: 51.44083, lng: 5.47778 });
  const [bounds, setBounds] = useState(null);
  const [refs, setRefs] = useState({});
  
  // Refs
  const googleMapRef = useRef() 
  const searchBoxRef = useRef() 

  const {
    selectedStore,
    setSelectedStore,
    stores,
    setStores,
  } = useStoreContext();

  const theme = useTheme();
  const styles = useStyles();
  const router = useRouter();

  useEffect(async () => {
    // Get location of user
    if ("geolocation" in navigator) {
      await navigator.geolocation.getCurrentPosition(function (position) {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation Not Available");
    }

    setStores(locationList);
  }, []);

  useEffect(() => {
    if(directions){
      // Get directions with updated travel mode
      showDirections()
    }
  }, [travelMode])

  useEffect(() => {
    if (!userPosition) return;
    const service = new google.maps.DistanceMatrixService();

    // User position
    const origin = { lat: userPosition.lat, lng: userPosition.lng };

    // Add store addresses in a destinations array
    const destinations = [];
    stores.map((store) => {
      destinations.push(`${store.address}`);
    });

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status !== "OK") {
          alert("Error was: " + status);
        } else {
          const destinationList = response.destinationAddresses;
          const distanceFromOrigin = response.rows[0].elements;

          let destinationInfo = destinationList.map((destination, idx) => {
            return {
              destination,
              distance: distanceFromOrigin[idx].distance,
              duration: distanceFromOrigin[idx].duration,
            };
          });

          let updatedStoreList = [];

          stores.map((store) => {
            // Filter destination info for the current store
            const targetDestination = destinationInfo.find(
              (destination) => store.address === destination.destination
            );

            // Duplicate current store object with new data
            const newStoreData = {
              ...store,
              distanceInfo: {
                distance: targetDestination.distance,
                duration: targetDestination.duration,
              },
            };

            // Update store in stores object
            updatedStoreList.push(newStoreData);
          });

          setStores(updatedStoreList);
        }
      }
    );
  }, [userPosition]);

  const handleMarkerClick = (e, store) => {
    setSelectedStore(store);
  };

  const goToStorePage = (e, href) => {
    router.push(href);
  };

  const showDirections = () => {
    const DirectionsService = new google.maps.DirectionsService();

    var start = new google.maps.LatLng(userPosition.lat, userPosition.lng);
    var end = new google.maps.LatLng(selectedStore.lat, selectedStore.lng);

    DirectionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  // Search bar
  const onBoundsChanged = () => {
    setBounds(refs.map.getBounds())
    setCenter(refs.map.getCenter())
  }

  const onMapMounted = ref => {
    refs.map = ref
  }

  const onPlacesChanged = () => {
    const places = searchBoxRef.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    console.log(`places`, places)

    // places.forEach(place => {
    //   if (place.geometry.viewport) {
    //     bounds.union(place.geometry.viewport)
    //   } else {
    //     bounds.extend(place.geometry.location)
    //   }
    // });
    // const nextMarkers = places.map(place => ({
    //   position: place.geometry.location,
    // }));
    // const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

    // this.setState({
    //   center: nextCenter,
    //   markers: nextMarkers,
    // });
  }

  return (
    <>
    <GoogleMap
      defaultZoom={13}
      center={center}
      defaultOptions={{ styles: mapStyles }}
      onBoundsChanged={onBoundsChanged}
      ref={onMapMounted}
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
      {filteredStores &&
        filteredStores.map((store, idx) => (
          <Marker
            key={idx}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={(e) => handleMarkerClick(e, store)}
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
            <Box display="flex" justifyContent="space-between">
              <h4 className={classes.info_window_heading}>
                {" "}
                {selectedStore?.name}
              </h4>
              <Typography
                variant="h6"
                style={{ color: theme.palette.primary.main }}
              >
                {selectedStore?.distanceInfo?.distance?.text}
              </Typography>
            </Box>

            <p className={classes.info_window_address}>
              {selectedStore?.address}
            </p>

            {/* Travel mode */}
            {directions && (
              <TravelModeSelect travelMode={travelMode} setTravelMode={(option) => setTravelMode(option.toUpperCase())}/>
            )}

            <Box display="flex" justifyContent="space-between">
              <Button
                className={styles.infoWindowButtonUnderlined}
                color="primary"
                onClick={
                  directions ? (e) => setDirections() : (e) => showDirections()
                }
              >
                {directions ? "Hide directions" : "Show directions"}
              </Button>
              <a
                onClick={(e) => goToStorePage(e, `stores/${selectedStore.id}`)}
              >
                <Button
                  className={styles.infoWindowButton}
                  variant="contained"
                  color="primary"
                >
                  View products
                </Button>
              </a>
            </Box>
          </div>
        </InfoWindow>
      )}
      {/* Directions */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />
      )}
      {/* Search bar */}
      <SearchBox
      ref={searchBoxRef}
      bounds={bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    </GoogleMap>
    {/* <StandaloneSearchBox
    ref={searchBoxRef}
    bounds={bounds}
    onPlacesChanged={onPlacesChanged}
  >
    <input
      type="text"
      placeholder="Customized your placeholder"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
      }}
    />
  </StandaloneSearchBox> */}
  </>
  );
};

export default withScriptjs(withGoogleMap(Map));

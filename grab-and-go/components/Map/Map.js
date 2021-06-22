import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useStoreContext } from "../../context";
import { locationList } from "../../assets/locationList";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import mapStyles from "./mapStyles";

// Google maps
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    position: "absolute",
    bottom: 30,
    left: "calc(50% - 120px)",
    [theme.breakpoints.up("md")]: {
      bottom: 0,
      top: 30,
    },
  },
}));

const Map = ({ filteredStores }) => {
  // State
  const [userPosition, setUserPosition] = useState();
  const [directions, setDirections] = useState();
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [places, setPlaces] = useState([]);
  const [refs, setRefs] = useState({});
  const [bounds, setBounds] = useState();
  const [center, setCenter] = useState({ lat: 51.44083, lng: 5.47778 });

  const {
    selectedStore,
    setSelectedStore,
    stores,
    setStores,
  } = useStoreContext();

  const router = useRouter();
  const styles = useStyles();
  const searchBoxRef = useRef();

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
    if (directions) {
      // Get directions with updated travel mode
      showDirections();
    }
  }, [travelMode]);

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

  const onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
    // console.log(`ref`, refs.searchBox)
  };

  // Search locations
  const onPlacesChanged = async () => {
    // Get place data from google api
    const place = await refs.searchBox.getPlaces();

    let newMapPosition = {...center}

    if(place){
      // Get coordinates
      newMapPosition = {
        lat: place[0].geometry.location.lat(),
        lng: place[0].geometry.location.lng(),
      };
    }

    // Update map and 
    setCenter(newMapPosition);
    setPlaces(place);
  };

  let showDirectionsInfo = false;
  if (directions && selectedStore) {
    // Directions coordinates returned from request
    // get destination value and compare with selected store
    // in order to render travelMode select and directions button in infoWindow
    let lat = directions.request.destination.location.lat();
    let lng = directions.request.destination.location.lng();

    if (selectedStore?.lat === lat && selectedStore?.lng === lng) {
      showDirectionsInfo = true;
    }
  }

  return (
    <GoogleMap
      defaultZoom={13}
      center={center}
      defaultOptions={{ styles: mapStyles }}
    >
      <Box className={styles.searchBox}>
        <StandaloneSearchBox
          ref={onSearchBoxMounted}
          bounds={bounds}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search locations"
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
        </StandaloneSearchBox>
      </Box>
      {/* Display user location */}
      {userPosition && <Marker location={userPosition} userMarker />}
      {/* Display store locations */}
      {filteredStores &&
        filteredStores.map((store, idx) => (
          <Marker key={idx} location={store} onClick={handleMarkerClick} />
        ))}
      {selectedStore && (
        <InfoWindow
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          directions={directions}
          showDirections={showDirections}
          travelMode={travelMode}
          setTravelMode={setTravelMode}
          setDirections={setDirections}
          showDirectionsInfo={showDirectionsInfo}
          goToStorePage={goToStorePage}
        />
      )}
      {/* Directions */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));

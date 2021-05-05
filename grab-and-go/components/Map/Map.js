import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  makeStyles,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import { locationList } from "../../assets/locationList";
import { useStoreContext } from "../../context";
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
          const originList = response.originAddresses;
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
    setShowInfo(true);
  };

  const goToStorePage = (e, href) => {
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
            onClick={(e) => handleMarkerClick(e, store)}
            icon={{
              url: "/images/pointer.svg",
              scaledSize: new window.google.maps.Size(45, 50),
            }}
          />
        ))}
      {showInfo && selectedStore && (
        <InfoWindow
          position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
          onCloseClick={() => setShowInfo(false)}
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
                {selectedStore?.distanceInfo?.distance.text}
              </Typography>
            </Box>

            <p className={classes.info_window_address}>
              {selectedStore?.address}
            </p>
            <a
              onClick={(e) =>
                goToStorePage(
                  e,
                  `stores/${selectedStore.id}`
                )
              }
            >
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

import React from "react";
import { InfoWindow } from "react-google-maps";
import TravelModeSelect from "./TravelModeSelect";
import classes from "../../styles/Home.module.scss";

// Mui
import {
  Button,
  makeStyles,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";

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

const MapInfoWindow = ({ selectedStore, setSelectedStore,  goToStorePage, directions, showDirections, showDirectionsInfo, setDirections, travelMode, setTravelMode }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
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

        <p className={classes.info_window_address}>{selectedStore?.address}</p>

        {/* Travel mode */}
        {directions && showDirectionsInfo && (
          <TravelModeSelect
            travelMode={travelMode}
            setTravelMode={(option) => setTravelMode(option.toUpperCase())}
          />
        )}

        <Box display="flex" justifyContent="space-between">
          <Button
            className={styles.infoWindowButtonUnderlined}
            color="primary"
            onClick={
              directions && showDirectionsInfo
                ? (e) => setDirections()
                : (e) => showDirections()
            }
          >
            {directions && showDirectionsInfo
              ? "Hide directions"
              : "Show directions"}
          </Button>
          <a onClick={(e) => goToStorePage(e, `stores/${selectedStore.id}`)}>
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
  );
};

export default MapInfoWindow;

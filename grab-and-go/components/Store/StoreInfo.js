// Material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "20px 25px",
  },
}));

const StoreInfo = ({selectedStore}) => {
  // Mui
  const styles = useStyles();

  return (
    <Paper className={styles.paperBox} elevation={5}>
      <Grid container spacing={4}>
        <Grid item md={4} style={{ width: "100%" }}>
          {selectedStore != null && (
            <img
              src={selectedStore?.storeImage}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Grid>
        <Grid item md={8}>
          <Box display="flex" flexDirection="column" height={1}>
            {/* Name + distance away */}
            <Box display="flex" flexGrow="0" justifyContent="space-between">
              <Typography color="primary" variant="h4">
                {selectedStore?.name}
              </Typography>
              <Typography color="primary" variant="h6">
                {selectedStore?.distanceInfo?.distance?.text} away
              </Typography>
            </Box>

            {/* Address */}
            <Typography className="gray-muted" variant="h7" component="h6">
              {selectedStore?.address}
            </Typography>

            {/* Description */}
            <Box flexGrow={1} mt={1} mb={3}>
              <Typography variant="h7">{selectedStore?.description}</Typography>
            </Box>

            {/* Ready for pick up */}
            <Box flexGrow={0}>
              <Typography color="secondary" variant="h7" component="h6">
                Ready for pick up: {selectedStore?.pickUpTime}{" "}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StoreInfo;

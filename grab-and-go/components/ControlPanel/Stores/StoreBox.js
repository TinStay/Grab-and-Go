import classes from "../../../styles/Home.module.scss";
import { useStoreContext } from "../../../context";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, useTheme, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.8rem auto",
    padding: "20px 15px",
    // backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #f2f2f2",
    cursor: "pointer",
    transition: "all 0.2s ease-in",

    webkitBoxShadow: "2px 6px 10px 0px rgba(0, 0, 0, 0.26)",
    boxShadow: "2px 6px 10px 0px rgba(0, 0, 0, 0.26)",

    "&.active": {
      backgroundColor: "rgb(248, 248, 248)",
    },
  },
}));

const StoreBox = ({ store }) => {
  const { selectedStore, setSelectedStore } = useStoreContext();
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Paper
      className={
        store === selectedStore ? `${styles.root} active` : styles.root
      }
      onClick={() => setSelectedStore(store)}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        alignItems="center"
      >
        <Box>
          <h5 className="dark-green-text">{store.name}</h5>
          <p className="text-muted">{store.address}</p>
          {store === selectedStore && (
            <Typography style={{ color: `${theme.palette.secondary.main}` }}>
              Ready for pick up: {store.pickUpTime}
            </Typography>
          )}
        </Box>
        <Box>
          <span className="green-text h5">
            {store?.distanceInfo?.distance?.text}
          </span>
        </Box>
      </Box>
    </Paper>
  );
};

export default StoreBox;

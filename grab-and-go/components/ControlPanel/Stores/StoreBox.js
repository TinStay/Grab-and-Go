import classes from "../../../styles/Home.module.scss";
import { useStoreContext } from "../../../context";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.8rem auto",
  padding: "20px 15px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "1px solid #f2f2f2",
  

  webkitBoxShadow: "2px 6px 10px 0px rgba(0, 0, 0, 0.26)",
  boxShadow: "2px 6px 10px 0px rgba(0, 0, 0, 0.26)",

  "&.active": {
    backgroundColor: "rgb(245, 245, 245)" 
  }
  },
}));

const StoreBox = ({ store }) => {
  const { selectedStore, setSelectedStore } = useStoreContext();
  const styles = useStyles();

  return (
    <Box
      className={
        store === selectedStore
          ? `${styles.root} active`
          : styles.root
      }
      onClick={() => setSelectedStore(store)}
    >
      <div className="d-flex justify-content-between px-3 align-items-center">
        <div>
          <h5 className="dark-green-text">{store.name}</h5>
          <p className="text-muted">{store.address}</p>
        </div>
        <div>
          <span className="green-text h5">{store.distance}</span>
        </div>
      </div>
    </Box>
  );
};

export default StoreBox;

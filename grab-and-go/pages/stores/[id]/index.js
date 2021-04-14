import React, { useState } from "react";
import ProductCard from "../../../components/Store/ProductCard";

// Material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Link,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Context
import { useStoreContext } from "../../../context";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 25px",
  },
  cartContainer: {
    position: "fixed",
    bottom: "10%",
    right: "5%",
    width: "250px",
    height: "500px",
    padding: "20px 25px",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
      height: "500px",
    }
  },
}));

// Generate ID for Tab
function tabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const Store = () => {
  const styles = useStyles();

  // State
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const { selectedStore, setSelectedStore } = useStoreContext(0);

  console.log(`selectedStore?.storeImage`, selectedStore?.storeImage);
  return (
    <Container>
      <Box position="relative" my="1rem">
        {/* Go back link */}
        <Typography>
          <Link color="secondary" className="text-decoration-none" href="/">
            <i className="fas fa-angle-left mb-3 me-1"></i>Go back
          </Link>
        </Typography>

        {/* Store info */}
        <Box mb={3}>
          <Paper className={styles.container} elevation={5}>
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
                  <Box
                    display="flex"
                    flexGrow="0"
                    justifyContent="space-between"
                  >
                    <Typography color="primary" variant="h4">
                      {selectedStore?.name}
                    </Typography>
                    <Typography color="primary" variant="h6">
                      {selectedStore?.distanceInfo.distance.text} away
                    </Typography>
                  </Box>

                  {/* Address */}
                  <Typography
                    className="gray-muted"
                    variant="h7"
                    component="h6"
                  >
                    {selectedStore?.address}
                  </Typography>

                  {/* Description */}
                  <Box flexGrow={1} mt={1} mb={3}>
                    <Typography variant="h7">
                      {selectedStore?.description}
                    </Typography>
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
        </Box>

        {/* Menu */}
        <Box>
          <AppBar
            position="static"
            style={{ margin: "0 auto", backgroundColor: "white" }}
          >
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {/* Display product categories */}
              {selectedStore?.products?.map((category, idx) => {
                return <Tab label={category.category} {...tabProps(idx)} />;
              })}
            </Tabs>
          </AppBar>

          {selectedStore?.products?.map((category, idx) => {
            return (
              <TabPanel value={selectedTab} index={idx} {...tabProps(idx)}>
                <Grid container alignItems="stretch" spacing={3}>
                  {category.items.map((item) => {
                    return (
                      <Grid item md={3} sm={6}>
                        <ProductCard item={item} />
                      </Grid>
                    );
                  })}
                </Grid>
              </TabPanel>
            );
          })}
        </Box>
        {/* Shopping cart con container */}
        {showCart && 
        <Paper className={styles.cartContainer} elevation={6}>
          <Box color="primary">

          </Box>
          
        </Paper>}

        {/* Shopping cart button */}
        <Box style={{ position: "fixed", bottom: "3%", right: "5%" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowCart(true)}
            style={{ color: "white", padding: "10px 25px" }}
          >
            <ShoppingCartIcon style={{ marginRight: "5px" }} />{" "}
            <Typography>Shopping Cart: 7$</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Store;

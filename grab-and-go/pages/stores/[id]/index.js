import React, { useState } from "react";
import ProductCard from "../../../components/Store/ProductCard";
import Image from "next/image";

// Components
import CartItem from "../../../components/Store/CartItem";

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
  useTheme,
  Divider,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

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
    width: "300px",
    height: "500px",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: "350px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
      height: "500px",
    },
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

  const theme = useTheme();

  const primary = theme.palette.primary.main;

  // State
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const { selectedStore, shoppingCart, setShoppingCart } = useStoreContext(0);

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
        {/* Shopping cart container */}
        {showCart && (
          <Paper className={styles.cartContainer} elevation={6}>
            <Box  
            height={1}
            display="flex"
            flexDirection="column"
            >
            {/* Label + close button */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexGrow={0}
              style={{
                padding: "12px 25px",
                backgroundColor: primary,
                color: "white",
                textAlign: "right",
              }}
            >
              <Typography style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                My Shopping Cart
              </Typography>
              <IconButton onClick={() => setShowCart(false)}>
                <ExpandMoreRoundedIcon
                  style={{ color: "white", transform: "scale(1.4)" }}
                />
              </IconButton>
            </Box>

            <Box
            display="flex"
            flexDirection="column"
            height={"82%"}
            justifyContent="space-between"
            flexGrow={1}
              style={{
                padding: "12px 15px",
                
              }}
            >
              {/* Shopping cart items */}
              <Box style={{ overflowY: "auto", paddingRight: '1rem' }}>
                {shoppingCart &&  shoppingCart.items.map(item => {
                  return <CartItem item={item}></CartItem>
                })}
                
              </Box>

              <Box style={{padding: "5px 15px"}}>
              {/* Total price info */}
              <Box
                mt={2}
                mb={0.2}
                display="flex"
                justifyContent="space-between"
                className="gray-muted"
              >
                <Typography>Subtotal: </Typography>
                <Typography>${shoppingCart.totalPrice}</Typography>
              </Box>
              <Box
              mb={0.2}
                display="flex"
                justifyContent="space-between"
                className="gray-muted"
              >
                <Typography>Service cost: </Typography>
                <Typography>$2</Typography>
              </Box>
              <Divider style={{ opacity: 0.8 }} />
              <Box
                mt={1}
                display="flex"
                justifyContent="space-between"
                className="green-text"
              >
                <Typography variant="h5">Total: </Typography>
                <Typography variant="h5">$12</Typography>
              </Box>
            </Box>
            </Box>
            </Box>
          </Paper>
        )}

        {/* Shopping cart button */}
        <Box style={{ position: "fixed", bottom: "3%", right: "5%" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowCart(!showCart)}
            style={{ color: "white", padding: "10px 25px" }}
          >
            <ShoppingCartIcon style={{ marginRight: "5px" }} />{" "}
            <Typography>Shopping Cart</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Store;

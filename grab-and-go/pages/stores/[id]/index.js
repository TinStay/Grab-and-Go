import React, { useState } from "react";
import ProductCard from "../../../components/Store/ProductCard";
import Link from "next/link";

// Components
import StoreInfo from '../../../components/Store/StoreInfo'
import ShoppingCart from '../../../components/Store/ShoppingCart'

// Material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Box,
  Container,
  Grid,
  AppBar,
  Tabs,
  Tab,
  useTheme,
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
  // Mui
  const styles = useStyles();
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  // State
  const { selectedStore, shoppingCart } = useStoreContext();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCart, setShowCart] = useState(false);

  return (
    <Container style={{ paddingBottom: "2rem", position: "relative" }}>
      <Box position="relative" my="1rem">
        {/* Go back link */}
        <Typography>
          <Link  href="/" >
            <a className="text-decoration-none" style={{color: secondary}}>
              <i className="fas fa-angle-left mb-3 me-1"></i>Go back
            </a>
          </Link>
        </Typography>

        {/* Store info */}
        <Box mb={3}>
          <StoreInfo selectedStore={selectedStore}/>
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
                        <ProductCard
                          item={item}
                          showAlert={() => setOpen(true)}
                        />
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
          <ShoppingCart shoppingCart={shoppingCart} setShowCart={setShowCart}/>
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

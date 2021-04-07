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
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";

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
  const { selectedStore, setSelectedStore } = useStoreContext(0);

  return (
    <Container>
      <Box my="3rem">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Paper className={styles.container} elevation={5}>
              <Typography color="primary" variant="h4">
                {selectedStore?.name}
              </Typography>
              <Typography variant="h7">{selectedStore?.address}</Typography>
              <Typography color="primary" variant="h6">
                {selectedStore?.distanceInfo.distance.text} away
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            {/* <Paper className={styles.container} elevation={5}> */}

            <AppBar position="static" color="default">
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
                  <Grid container spacing={2}>
                    {category.items.map((item) => {
                      return (
                        <Grid item xs={4}>
                          <ProductCard item={item} />
                        </Grid>
                      )
                    })}
                  </Grid>
                </TabPanel>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Store;

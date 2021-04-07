import React, { useState } from "react";

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
    padding: "15px 20px",
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Store = () => {
  const styles = useStyles();

  // State
  const [selectedTab, setSelectedTab] = useState()
  const { selectedStore, setSelectedStore } = useStoreContext(0);

  return (
    <Container>
      <Box my="3rem">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Paper className={styles.container} elevation={5}>
              <Typography variant="h6">{selectedStore?.name}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            {/* <Paper className={styles.container} elevation={5}> */}
            <Typography variant="h2">{selectedStore?.name}</Typography>

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
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
              </Tabs>
            </AppBar>
            <TabPanel value={selectedTab} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={selectedTab} index={3}>
              Item Four
            </TabPanel>
            <TabPanel value={selectedTab} index={4}>
              Item Five
            </TabPanel>
            <TabPanel value={selectedTab} index={5}>
              Item Six
            </TabPanel>
            <TabPanel value={selectedTab} index={6}>
              Item Seven
            </TabPanel>
            

          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Store;

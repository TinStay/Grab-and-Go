import Head from "next/head";
import { PureComponent } from "react";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import Map from "../components/Map/Map";
import classes from "../styles/Home.module.scss";
import { StoreContext } from '../context'

// Material UI
import {Box, Grid} from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  mapContainer: {
    height: "100vh",
    backgroundColor: "red",
  }
})

class Home extends PureComponent {
  state = {
    stores: [],
    filters: {
      storeType: "",
      sortBy: "",
      range: "",
      location: "",
    },
  };

  // Context
  static contextType = StoreContext

  handleFilterChange = (e) => {
    // Update state filter value
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        [e.target.name]: e.target.value,
      },
    });
  };


  
  render() {
    const storeType = this.state.filters.storeType
    const range = this.state.filters.range
    const styles = this.props
    let filteredStores = [...this.context.stores]
    
    // Apply filters to store list
    if(storeType !== ""){
      filteredStores = this.context.stores.filter(store => store.storeType === storeType)
    }
    
    if(range !== ""){
      // Convert string to int
      let rangeInt = parseInt(range)
      filteredStores = this.context.stores.filter(store => parseInt(store.distanceInfo.distance.text) < rangeInt)
    }
      
    let mainContainerClasses = [classes.main_container];

    return (
      <Box >
        <Head>
          <title>Grab and Go</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid container className={mainContainerClasses.join(" ")}>
          <Grid item md={7} className={styles.mapContainer} style={{height: "100vh"}}>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAOJDDyL012DooU8FHDbH8yLARMV7L4U-o`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div id="google-map" style={{ height: `100%` }} />}
              filteredStores={filteredStores}
            />
          </Grid>
          <Grid item md={5}>
            <ControlPanel
              handleFilterChange={(e) => this.handleFilterChange(e)}
              filteredStores={filteredStores}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);

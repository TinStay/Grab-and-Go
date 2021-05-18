import Head from "next/head";
import { PureComponent } from "react";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import Map from "../components/Map/Map";
import classes from "../styles/Home.module.scss";
import { StoreContext } from '../context'

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
      
    let mainContainerClasses = [classes.main_container, "row"];

    return (
      <div className="mx-auto">
        <Head>
          <title>Grab and Go</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={mainContainerClasses.join(" ")}>
          <div className="col-12 col-lg-7 px-0" style={{ height: "100vh" }}>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAOJDDyL012DooU8FHDbH8yLARMV7L4U-o`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div id="google-map" style={{ height: `100%` }} />}
              filteredStores={filteredStores}
            />
          </div>
          <div className="col-12 col-lg-5 px-0">
            <ControlPanel
              handleFilterChange={(e) => this.handleFilterChange(e)}
              filteredStores={filteredStores}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;

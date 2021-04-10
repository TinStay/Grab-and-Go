import Head from "next/head";
import { PureComponent } from "react";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import Map from "../components/Map/Map";
import classes from "../styles/Home.module.scss";

class Home extends PureComponent {
  state = {
    storeType: null,
    sortBy: null,
    range: null,
    location: null,
  };

  handleFilterChange = (e) => {
    // Update state filter value
    this.setState({ ...this.state,
      [e.target.name]: e.target.value });
    };


  render() {
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
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className="col-12 col-lg-5 px-0">
            <ControlPanel handleFilterChange={(e) => this.handleFilterChange(e)}/>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;

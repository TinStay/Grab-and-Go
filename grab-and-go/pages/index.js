import Head from "next/head";
import { PureComponent } from "react";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import Map from "../components/Map/Map";
import classes from "../styles/Home.module.scss";

class Home extends PureComponent {
  state = {};

  render() {
    let mainContainerClasses = [classes.main_container, "row"];


    return (
      <div className="">
        <Head>
          <title>Grab and Go</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={mainContainerClasses.join(" ")}>
          <div className="col-12 col-lg-7 " style={{ height: "100vh" }}>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className="col-12 col-lg-5">
            <ControlPanel />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;

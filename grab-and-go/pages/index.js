import Head from "next/head";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import classes from "../styles/Home.module.scss";

export default function Home() {

  let mainContainerClasses = [classes.main_container, "row"]
  
  return (
    <div className="">
      <Head>
        <title>Grab and Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={mainContainerClasses.join(" ")}>
        {/* <div className="d-flex"> */}
          <div className="col-12 col-lg-6 ">MAP</div>
          <div className="col-12 col-lg-6">
            <ControlPanel />
          </div>
        {/* </div> */}
      </main>
    </div>
  );
}

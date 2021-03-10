import classes from "../../styles/Home.module.scss";
import FilterBox from "./FilterBox";

const ControlPanel = () => {
  return (
    <div className={classes.control_panel}>
      <div>
        <FilterBox />
      </div>
      <div>
        <p>Results</p>
      </div>
    </div>
  );
};

export default ControlPanel;

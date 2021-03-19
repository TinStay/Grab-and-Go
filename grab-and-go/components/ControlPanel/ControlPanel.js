import classes from "../../styles/Home.module.scss";
import FilterBox from "./Filters/FiltersBox";
import StoreList from "./Stores/StoreList";

const ControlPanel = (props) => {
  return (
    <div className={classes.control_panel}>
      <div>
        <FilterBox handleFilterChange={(e) => props.handleFilterChange(e)}/>
      </div>
      <div>
        <StoreList />
      </div>
    </div>
  );
};

export default ControlPanel;

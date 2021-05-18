import classes from "../../styles/Home.module.scss";
import FilterBox from "./Filters/FiltersBox";
import StoreList from "./Stores/StoreList";

const ControlPanel = ({filteredStores, handleFilterChange}) => {
  return (
    <div className={classes.control_panel}>
      <div>
        <FilterBox handleFilterChange={(e) => handleFilterChange(e)}/>
      </div>
      <div>
        <StoreList filteredStores={filteredStores}/>
      </div>
    </div>
  );
};

export default ControlPanel;

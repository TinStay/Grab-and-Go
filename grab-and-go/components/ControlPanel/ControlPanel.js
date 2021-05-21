import classes from "../../styles/Home.module.scss";
import FilterBox from "./Filters/FiltersBox";
import StoreList from "./Stores/StoreList";

const ControlPanel = ({filteredStores, handleFilterChange}) => {
  return (
    <div className={classes.control_panel}>
        <FilterBox handleFilterChange={(e) => handleFilterChange(e)}/>
        <StoreList filteredStores={filteredStores}/>
    </div>
  );
};

export default ControlPanel;

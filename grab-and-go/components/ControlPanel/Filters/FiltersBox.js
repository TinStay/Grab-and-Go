import classes from "../../../styles/Home.module.scss";
import FilterSelect from "./FilterSelect";

const FiltersBox = () => {
  let filterBoxClasses = ["row", classes.white_container];
  return (
    <div className="container">
      <h2 className="dark-green-text">Filters</h2>
      <div className={filterBoxClasses.join(" ")}>
        <div className="col-6">
          <FilterSelect label="Store Type" />
        </div>
        <div className="col-6">
          <FilterSelect label="Sort By" />
        </div>
        <div className="col-6">
          <FilterSelect label="Range" />
        </div>
        <div className="col-6">
          <FilterSelect label="Location" />
        </div>
      </div>
    </div>
  );
};

export default FiltersBox;

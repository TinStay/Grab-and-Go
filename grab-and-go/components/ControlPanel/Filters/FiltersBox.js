import classes from "../../../styles/Home.module.scss";
import FilterSelect from './FilterSelect'

const FiltersBox = () => {

    let filterBoxClasses = ["row", classes.white_container]
  return (
    <div className="container">
      <h2 className="dark-green-text">Filters</h2>
      <div className={filterBoxClasses.join(" ")}>

        <FilterSelect label="Store Type"/>
        <FilterSelect label="Sort By"/>
        <FilterSelect label="Range"/>
        <FilterSelect label="Location"/>
      </div>
    </div>
  );
};

export default FiltersBox;

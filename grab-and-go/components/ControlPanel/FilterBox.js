import classes from "../../styles/Home.module.scss";
import FilterSelect from './FilterSelect'

const FilterBox = () => {

    let filterBoxClasses = ["row", classes.filter_box]
  return (
    <div className="container">
      <h2>Filter</h2>
      <div className={filterBoxClasses.join(" ")}>

        <FilterSelect/>
        <FilterSelect/>
        <FilterSelect/>
        <FilterSelect/>
      </div>
    </div>
  );
};

export default FilterBox;

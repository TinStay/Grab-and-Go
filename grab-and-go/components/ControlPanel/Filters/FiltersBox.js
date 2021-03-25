import React, { useState } from "react";
import classes from "../../../styles/Home.module.scss";
import FilterSelect from "./FilterSelect";
import { Typography } from '@material-ui/core'

const FiltersBox = (props) => {
 

  
  let filterBoxClasses = ["row", classes.white_container];

  return (
    <div className="container">
     <h2 className="dark-green-text">Filters</h2>
      <div className={filterBoxClasses.join(" ")}>
        <div className="col-6">
          <FilterSelect
            label="Store Type"
            name="storeType"
            handleFilterChange={(e) => props.handleFilterChange(e)}
          />
        </div>
        <div className="col-6">
          <FilterSelect
            label="Sort By"
            name="sortBy"
            handleFilterChange={(e) => props.handleFilterChange(e)}
          />
        </div>
        <div className="col-6">
          <FilterSelect
            label="Range"
            name="range"
            handleFilterChange={(e) => props.handleFilterChange(e)}
          />
        </div>
        <div className="col-6">
          <FilterSelect
            label="Location"
            name="location"
            handleFilterChange={(e) => props.handleFilterChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersBox;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import classes from "../../../styles/Home.module.scss";

import * as filterOptions from "./FilterOptions";

const FilterSelect = (props) => {
  {
  }
  const [selectedValue, setSelectedValue] = useState(null);

  let options = [];

  switch (props.name) {
    case "storeType":
      options = filterOptions.storeType;
      break;
    case "sortBy":
      options = filterOptions.sortBy;
      break;
    case "range":
      options = filterOptions.range;
      break;
    case "location":
      options = filterOptions.location;
      break;
      dafault: break;
  }

  return (
    <FormControl className="w-100 mb-2">
      
      <InputLabel htmlFor={`${props.name}-select`}>{props.icon} {props.label}</InputLabel>
      <Select
        native
        value={selectedValue}
        onChange={(e) => props.handleFilterChange(e)}
        inputProps={{
          name: props.name,
          id: `${props.name}-select`,
        }}
      >
       {options && options.map((option) => {
         return <option value={option}>{option}</option>
       })}
        
      </Select>
    </FormControl>
  );
};

export default FilterSelect;

// <div className="col-6 my-2">
//   <p className="mb-2">{props.label}</p>
//   <select className="w-100">
//     <option value="1">1</option>
//     <option value="2">2</option>
//     <option value="3">3</option>
//   </select>
// </div>

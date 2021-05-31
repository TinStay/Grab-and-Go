import React, { useState } from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";

import * as filterOptions from "./FilterOptions";

const FilterSelect = ({name, label, icon, handleFilterChange}) => {
  {
  }
  const [selectedValue, setSelectedValue] = useState("");

  let options = [];

  switch (name) {
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
    <FormControl className="w-100 ">
      
      <InputLabel htmlFor={`${name}-select`}>{icon} {label}</InputLabel>
      <Select
        // native
        size="small"
        value={selectedValue}
        onChange={(e) => handleFilterChange(e)}
        inputProps={{
          name: name,
          id: `${name}-select`,
        }}
      >
       {options && options.map((option) => {
         return <MenuItem onClick={e => setSelectedValue(option)} value={option === "" ? "" : option}>{option === "" ? "None" : option}</MenuItem>
       })}
        
      </Select>
    </FormControl>
  );
};

export default FilterSelect;


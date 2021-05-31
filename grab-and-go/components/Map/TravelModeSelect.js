import React from 'react'
import {FormControl, Select, MenuItem, InputLabel} from "@material-ui/core";
import { capitalized } from '../../shared/helperFunctions'
import * as filterOptions from "../ControlPanel/Filters/FilterOptions";

const TravelModeSelect = ({ travelMode, setTravelMode }) => {   
    let options = filterOptions.travelMode; 

    return (
        <FormControl className="w-50 mb-3">
        <InputLabel htmlFor={`travel-mode-select`}>Travel mode</InputLabel>
        <Select
          // native
          size="small"
          value={capitalized(travelMode)}
          inputProps={{
            name: "travelMode",
            id: `travel-mode-select`,
          }}
        >
         {options && options.map((option) => {
           return <MenuItem onClick={e => setTravelMode(option)} value={option === "" ? "" : option}>{option === "" ? "None" : option}</MenuItem>
         })}
          
        </Select>
      </FormControl>
    )
}

export default TravelModeSelect

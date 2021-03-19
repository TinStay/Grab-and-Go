import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import classes from '../../../styles/Home.module.scss'

const FilterSelect = (props) => {{}
  const [selectedValue, setSelectedValue] = useState(null);

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  
    return (
      <FormControl className="w-100 mb-2">
        <InputLabel htmlFor={`${props.name}-select`}>{props.label}</InputLabel>
        <Select
          native
          value={selectedValue}
          onChange={e => props.handleFilterChange(e)}
          inputProps={{
            name: props.name,
            id: `${props.name}-select`
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    )
}

export default FilterSelect

        // <div className="col-6 my-2">
        //   <p className="mb-2">{props.label}</p>
        //   <select className="w-100">
        //     <option value="1">1</option>
        //     <option value="2">2</option>
        //     <option value="3">3</option>
        //   </select>
        // </div>
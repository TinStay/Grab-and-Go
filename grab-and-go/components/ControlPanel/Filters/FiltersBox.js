import React, { useState } from "react";
import FilterSelect from "./FilterSelect";

// Material UI
import { Grid, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import StoreIcon from "@material-ui/icons/Store";
import SortIcon from "@material-ui/icons/Sort";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.8rem auto",
    padding: "0px 20px 25px 20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #f2f2f2",
    
  
    webkitBoxShadow: "2px 6px 10px 0px rgba(0, 0, 0, 0.26)",
    boxShadow: "2px 6px 10px 0px rgba(0, 0, 0, 0.26)",
    },
}
));

const FiltersBox = (props) => {
  const styles = useStyles();

  return (
    <Container>
      <h2 className="dark-green-text">Filters</h2>
      <Box className={styles.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} style={{marginRight: "0"}}>
            <FilterSelect
              label="Store Type"
              name="storeType"
              handleFilterChange={(e) => props.handleFilterChange(e)}
              icon={<StoreIcon style={{ marginRight: "2px" }} />}
            />
          </Grid>
          <Grid item xs={6} style={{marginRight: "0"}}>
            <FilterSelect
              label="Sort By"
              name="sortBy"
              handleFilterChange={(e) => props.handleFilterChange(e)}
              icon={<SortIcon style={{ marginRight: "2px" }} />}
            />
          </Grid>
          <Grid item xs={6} style={{marginRight: "auto"}}>
            <FilterSelect
              label="Range"
              name="range"
              handleFilterChange={(e) => props.handleFilterChange(e)}
              icon={<MyLocationIcon style={{ marginRight: "2px" }} />}
            />
          </Grid>
          <Grid item xs={6} style={{marginRight: "auto"}}>
            <FilterSelect
              label="Location"
              name="location"
              handleFilterChange={(e) => props.handleFilterChange(e)}
              icon={<LocationCityIcon style={{ marginRight: "2px" }} />}
            />
          </Grid>
        </Grid>
        </Box>
    </Container>
  );
};

export default FiltersBox;

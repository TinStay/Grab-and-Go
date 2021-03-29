import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Box,
  Container,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import classes from "../../../styles/Store.module.scss";

const Store = (props) => {
  return (
    <Container>
      <Box my="3rem">
        <Grid container spacing={4  }>
          <Grid item xs={3}>
            <Paper elevation={5}>Filters</Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={5}>Products</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Store;

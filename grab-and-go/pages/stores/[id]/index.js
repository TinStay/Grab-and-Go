import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Box,
  Container,
  Grid,
} from "@material-ui/core";

// Context 
import { useStoreContext } from '../../../context'


const Store = () => {

  const {selectedStore, setSelectedStore} = useStoreContext()

  return (
    <Container>
      <Box my="1rem">
        <Typography variant="h2">{selectedStore.name}</Typography>
        <Grid container spacing={4 }>
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

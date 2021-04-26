import React from "react";
import { useStoreContext } from "../context";
import CheckoutItemBox from "../components/Store/CheckoutItemBox";

// Mui
import {
  Box,
  Paper,
  Container,
  Typography,
  Grid,
  Divider,
  Link as MuiLink,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paperBox: {
    padding: "20px 25px",
  },
  mainHeading: {
      fontSize: "1.8rem",
      paddingBottom: "8px",
      color: "#444444"
  }
}));

const Checkout = () => {
  const styles = useStyles();
  const { shoppingCart } = useStoreContext();

  return (
    <Container>
      <Box my="1rem">
        {/* Go back link */}
        <Typography>
          <MuiLink color="secondary" className="text-decoration-none" href="/">
            <i className="fas fa-angle-left mb-3 me-1"></i>Go back
          </MuiLink>
        </Typography>
        <Paper className={styles.paperBox}>
          <Grid container>
            <Grid item md={8}>
              <Typography className={styles.mainHeading} >
                Checkout
              </Typography>
              <Divider />
              {shoppingCart.items?.map((item) => {
                return <CheckoutItemBox item={item}></CheckoutItemBox>;
              })}
            </Grid>
            <Grid item md={4}>
              <Box>Price</Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout;

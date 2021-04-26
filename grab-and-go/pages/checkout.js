import React from "react";
import { Box, Paper, Container, Typography, Link as MuiLink } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paperBox: {
        padding: "20px 25px",
    },
}))

const Checkout = () => {
    const styles = useStyles()

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
          <Typography>Checkout</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout;

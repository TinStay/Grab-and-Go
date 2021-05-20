import Link from 'next/link'
import CartItem from "./CartItem";


// Material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  useTheme,
} from "@material-ui/core";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    position: "fixed",
    bottom: "10%",
    right: "5%",
    width: "300px",
    height: "500px",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: "350px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
      height: "500px",
    },
  },
}));

const ShoppingCart = ({shoppingCart, setShowCart }) => {
  const styles = useStyles();
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <Paper className={styles.cartContainer} elevation={6}>
      <Box height={1} display="flex" flexDirection="column">
        {/* Label + close button */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={0}
          style={{
            padding: "12px 25px",
            backgroundColor: primary,
            color: "white",
            textAlign: "right",
          }}
        >
          <Typography style={{ fontWeight: "500", fontSize: "1.2rem" }}>
            My Shopping Cart
          </Typography>
          <IconButton onClick={() => setShowCart(false)}>
            <ExpandMoreRoundedIcon
              style={{ color: "white", transform: "scale(1.4)" }}
            />
          </IconButton>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          height={"82%"}
          justifyContent="space-between"
          flexGrow={1}
          style={{
            padding: "12px 15px",
          }}
        >
          {/* Shopping cart items */}
          <Box style={{ overflowY: "auto", paddingRight: "1rem" }}>
            {shoppingCart &&
              shoppingCart.items.map((item) => {
                return <CartItem item={item}></CartItem>;
              })}
          </Box>

          <Box style={{ padding: "5px 15px" }}>
            {/* Total price info */}
            <Box
              mt={2}
              mb={0.2}
              display="flex"
              justifyContent="space-between"
              className="gray-muted"
            >
              <Typography>Subtotal: </Typography>
              <Typography>${shoppingCart.totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box
              mb={0.2}
              display="flex"
              justifyContent="space-between"
              className="gray-muted"
            >
              <Typography>Service cost: </Typography>
              <Typography>$2</Typography>
            </Box>
            <Divider style={{ opacity: 0.8 }} />
            <Box
              mt={1}
              display="flex"
              justifyContent="space-between"
              className="green-text"
            >
              <Typography variant="h5">Total: </Typography>
              <Typography variant="h5">
                ${(shoppingCart.totalPrice + 2).toFixed(2)}
              </Typography>
            </Box>
            <Box mt={2}>
              <Link href="/checkout">
                <Button
                  fullWidth
                  variant="contained"
                  float="right"
                  color="primary"
                  style={{ color: "white" }}
                >
                  Go to checkout
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ShoppingCart;

import React, { useState } from "react";
import { useStoreContext } from "../../context";
import { findObjectIdxInArray } from '../../shared/sharedFunctions'

//  Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Box,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
  },
  media: {
    height: "60%",
    backgroundSize: "cover",
    padding: "10px",
  },
  cardButtons: {
    display: "block",
    padding: "5px 20px",
    justifyContent: "space-between",
  },
}));

const ProductCard = (props) => {
  const styles = useStyles();
  const [count, setCount] = useState(1);
  const { shoppingCart, setShoppingCart } = useStoreContext();

  const item = { ...props.item };

  const addToCart = (item) => {
    // Duplicate state
    let newShoppingCart = { ...shoppingCart };

    // Returns index of item if it is already in the shopping list otherwise returns -1
    let indexOfItem = findObjectIdxInArray(
      newShoppingCart.items,
      "name",
      item.name
    );

    // Check if item is in the shopping cart
    if (indexOfItem != -1) {
      // Increase count of item in the shopping cart
      newShoppingCart.items[indexOfItem].count += count;
    } else {
      // Item is NOT in the cart
      // Add count property to item object
      let newItem = { ...item, count };

      // Add item to the shopping cart
      newShoppingCart.items.push(newItem);
    }

    // Update total price
    let newTotalPrice = 0;
    newShoppingCart.items.map(item => {
      newTotalPrice += (item.price * item.count) 
    })


    newShoppingCart.totalPrice = newTotalPrice

    

    // Reset count
    setCount(1)

    // Update context state
    setShoppingCart(newShoppingCart);
  };

  return (
    <Card className={styles.root} elevation={4}>
      <CardActionArea style={{ height: "74%" }}>
        <CardMedia className={styles.media} src={item.image} component="img" />
        <CardContent>
          <Typography variant="h5" color="primary">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardButtons}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mx="auto"
        >
          <Typography
            variant="h6"
            style={{ fontWeight: "500" }}
            color="primary"
          >
            ${item.price.toFixed(2)}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="reduce"
              color="secondary"
              onClick={() => {
                setCount(Math.max(count - 1, 1));
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography color="secondary" aria-label="count">
              {count}
            </Typography>
            <IconButton
              aria-label="increase"
              color="secondary"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Button
          onClick={() => addToCart(item)}
          variant="contained"
          color="primary"
          style={{ margin: " 5px 0", color: "#ffffff" }}
          fullWidth
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;



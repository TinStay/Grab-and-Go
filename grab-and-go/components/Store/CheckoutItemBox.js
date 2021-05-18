import React, { useState } from "react";
import Image from "next/image";
import { useStoreContext } from "../../context";
import { updateShoppingCart, getNewTotalPrice } from "../../shared/helperFunctions";

// Mui
import { Typography, Box, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  CheckoutItemBox: {
    border: "1px solid #EBEBEB",
    borderRadius: "10px",
    padding: "5px",
    margin: "15px 0",
  },
  textMuted: {
    color: "#736f73",
  },
}));

const CheckoutItemBox = ({item}) => {
  const { shoppingCart, setShoppingCart } = useStoreContext();

  const removeItem = (idx) => {
    // Duplicate shopping cart items array
    let newShoppingCart = {...shoppingCart};

    // Remove item from array
    newShoppingCart.items.splice(idx, 1);

    // Update totalPrice with updated shopping cart items
    newShoppingCart.totalPrice = getNewTotalPrice(newShoppingCart.items)

    // Update context state
    setShoppingCart(newShoppingCart);
  };

  const styles = useStyles();

  // Update state with new shoppingcart object
  const updateCount = (newCount) => {
    setShoppingCart(updateShoppingCart(item, newCount, shoppingCart));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      my={1}
      className={styles.CheckoutItemBox}
    >
      <Box display="flex" alignItems="center">
        <Image src={item.image} height="120px" width="120px" />
        <Box ml={2}>
          <Typography
            color="secondary"
            style={{
              fontWeight: "500",
              fontSize: "1.2rem",
              alignSelf: "center",
            }}
          >
            {item.name}
          </Typography>
          <Box display="flex" mt={0.5}>
            <Typography
              className={styles.textMuted}
              style={{ marginRight: "5px" }}
            >
              From:{" "}
            </Typography>
            <Typography>{item.orderedFrom}</Typography>
          </Box>
        </Box>
      </Box>
      <Box textAlign="center">
        {/* Product count */}
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="reduce"
            color="secondary"
            onClick={() => {
              updateCount(Math.max(item.count - 1, 1));
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography color="secondary" aria-label="count">
            {item.count}
          </Typography>
          <IconButton
            aria-label="increase"
            color="secondary"
            onClick={() => {
              updateCount(item.count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Price */}
        <Typography variant="h6" style={{ fontWeight: "500" }} color="primary">
          ${(item.price * item.count).toFixed(2)}
        </Typography>
        <Typography
          onClick={() => removeItem()}
          className={styles.textMuted}
          style={{ cursor: "pointer", marginTop: "5px" }}
          variant="body2"
        >
          Remove
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckoutItemBox;

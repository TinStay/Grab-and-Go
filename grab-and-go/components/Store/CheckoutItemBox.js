import React, { useState } from "react";
import Image from "next/image";
import { useStoreContext } from "../../context";
import { returnUpdatedShoppingCart } from "../../shared/sharedFunctions";

// Mui
import { Typography, Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  textMuted: {
    marginRight: "5px",
    color: "#736f73",
  },
}));

const CheckoutItemBox = ({ item }) => {
  const { selectedStore, shoppingCart, setShoppingCart } = useStoreContext();

  const styles = useStyles();

  // Update state with new shoppingcart object
  const updateCount = (newCount) => {
    setShoppingCart(returnUpdatedShoppingCart(item, newCount, shoppingCart));
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
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
            <Typography className={styles.textMuted}>From: </Typography>
            <Typography >
              {item.orderedFrom}
            </Typography>
          </Box>
        </Box>
      </Box>

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
    </Box>
  );
};

export default CheckoutItemBox;

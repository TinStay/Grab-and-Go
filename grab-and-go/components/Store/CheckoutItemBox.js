import React, {useState} from "react";
import Image from "next/image";
import { useStoreContext } from '../../context' 
import { findObjectIdxInArray } from "../../shared/sharedFunctions"

// Mui
import {
    Typography,
    Box,
    IconButton,
  } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const CheckoutItemBox = ({item}) => {
  const { shoppingCart, setShoppingCart } = useStoreContext()

  const setNewCount = newCount => {
    // Duplicate state
    let newShoppingCart = {...shoppingCart}

    // Update item new count
    let itemIdx = findObjectIdxInArray(newShoppingCart.items, "name", item.name)

    // Update item count
    newShoppingCart.items[itemIdx].count = newCount

     // Update total price
     let newTotalPrice = 0;
     newShoppingCart.items.map(item => {
       newTotalPrice += (item.price * item.count) 
     })
 
     newShoppingCart.totalPrice = newTotalPrice

    // Update store state 
    setShoppingCart(newShoppingCart)
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Image src={item.image} height="120px" width="120px" />
      <Typography
        color="secondary"
        style={{ fontWeight: "500", fontSize: "1.2rem" }}
      >
        {item.name}
      </Typography>
      {/* Product count */}
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label="reduce"
          color="secondary"
          onClick={() => {
            setNewCount(Math.max(item.count - 1, 1));
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
            setNewCount(item.count + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Price */}
      <Typography variant="h6" style={{ fontWeight: "500" }} color="primary">
        ${(item.price * item.count).toFixed(2) }
      </Typography>
    </Box>
  );
};

export default CheckoutItemBox;

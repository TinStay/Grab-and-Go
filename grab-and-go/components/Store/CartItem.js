import React, {useState} from "react";
import Image from "next/image";

// Mui
import {
    Typography,
    Box,
    IconButton,
  } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const CartItem = ({item}) => {

    const [count, setCount] = useState(0);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Image src={item.image} height="80px" width="80px" />
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
            setCount(Math.max(count - 1, 1));
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
            setCount(count + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Price */}
      <Typography variant="h6" style={{ fontWeight: "500" }} color="primary">
        ${item.price}
      </Typography>
    </Box>
  );
};

export default CartItem;

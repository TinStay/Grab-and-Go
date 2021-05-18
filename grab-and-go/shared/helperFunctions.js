export const findObjectIdxInArray = (array, prop, val) => {
  if (array.length > 0) {
    for (let i in array) {
      if (array[i][prop] === val) {
        return i;
      }
    }
  }
  return -1;
};

export const returnUpdatedShoppingCart = (item, newCount, shoppingCart) => {
  // Duplicate state
  let newShoppingCart = { ...shoppingCart };

  // Update item new count
  let itemIdx = findObjectIdxInArray(newShoppingCart.items, "name", item.name);

  // Update item count
  newShoppingCart.items[itemIdx].count = newCount;

  // Update total price
  let newTotalPrice = 0;
  newShoppingCart.items.map((item) => {
    newTotalPrice += item.price * item.count;
  });

  newShoppingCart.totalPrice = newTotalPrice;

  // Return updated store state
  return newShoppingCart
};

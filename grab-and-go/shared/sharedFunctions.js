export const findObjectIdxInArray = (array, prop, val) => {
    if (array.length > 0) {
      for (let i in array) {
        if (array[i][prop] === val) {
          return i;
        }
      }
    }
    return -1;
  }
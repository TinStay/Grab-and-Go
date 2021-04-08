import React, { useState } from "react";

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
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles({
  root: {
    height: "100%",
    
  },
  media: {
    height: "60%",
    backgroundSize: "cover",
    padding: "10px 15px 0px 15px"
  },
  cardButtons: {
    display: "block",
    justifyContent: "space-between",
  },
});

const ProductCard = (props) => {
  const styles = useStyles();
  const [count, setCount] = useState(0);

  const item = { ...props.item };

  console.log(`item.image`, item.image);

  return (
    <Card className={styles.root} elevation={4} >
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} width="90%" mx="auto">
          <Typography variant="h5" color="primary">
            {item.price}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="reduce"
              color="secondary"
              onClick={() => {
                setCount(Math.max(count - 1, 0));
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
          variant="contained"
          color="primary"
          style={{  margin: " 0", color: "#ffffff", }}
          fullWidth
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ProductCard = (props) => {
  const styles = useStyles();

  const item = { ...props.item };

  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h5" color="primary">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="primary">
          Add to cart
        </Button>
        <Button size="small" color="primary">
          View more
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

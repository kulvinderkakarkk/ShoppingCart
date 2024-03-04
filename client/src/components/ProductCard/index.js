import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const ProductCard = ({
  product: { id, title, images, price, description },
  addToCart
}) => {

  const [quantity, setQuantity] = React.useState(0);

  return (
    <Card sx={{ maxWidth: 300, margin: " 5px 5px 5px 5px" }}>
      <CardHeader
        title={title}
        subheader={"Price: $" + price}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardMedia
        component="img"
        height="194"
        image={images[0]}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <TextField
          label="Enter Quantity"
          size="small"
          onBlur={(e) => setQuantity(e.target.value)}
        />
        <Tooltip title="Add to cart">
          <IconButton aria-label="checkout" onClick={() => addToCart(id, title, price, quantity)}>
            <AddCircleOutlineRoundedIcon
              fontSize="large"
              color="primary"
              style={{ paddingLeft: "50%", paddingRight: "50%" }}
            />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default React.memo(ProductCard);

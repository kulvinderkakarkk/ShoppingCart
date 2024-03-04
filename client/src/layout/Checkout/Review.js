import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function Review({
  address: {
    first_name,
    last_name,
    address1,
    address2,
    city,
    zip,
    country,
    state,
  },
}) {
  const orders = useSelector((state) => state.saveOrder.orders);
  const addresses = [address1.trim() + " " + address2.trim(), city.trim(), state.trim(), zip.trim(), country.trim()];
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: `Mr ${first_name} ${last_name}` },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
  ];

  let total = 0;
  orders.forEach((order) => {
    total = total + order.product_quantity * order.product_price;
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orders.map((order) => (
          <ListItem key={uuidv4()} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={order.product_name}
              secondary={"Quantity:" + order.product_quantity}
            />
            <Typography variant="body2">
              ${order.product_price * order.product_quantity}{" "}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${first_name} ${last_name}`}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

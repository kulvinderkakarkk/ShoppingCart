import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const orderList = useSelector(state => state.saveOrder.orders)
  let orderNo = 0
  orderList.forEach(order => {
    orderNo = orderNo + Number(order.product_quantity)
  })

  const navigateToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigateToCheckout = () => {
    navigate('/checkout');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopping Cart
          </Typography>
          {localStorage.getItem("token") && (
            <>
              <Tooltip title="checkout">
                <IconButton color="inherit" onClick={navigateToCheckout}>
                <Badge badgeContent={orderNo} color="primary">
                  <AddShoppingCartIcon />
                </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="log out">
                <IconButton color="inherit" onClick={navigateToLogin}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

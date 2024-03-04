import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { post } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../../redux/slices/saveOrderSlice";
import { CenteredDiv } from "./styles";
import { useNavigate } from "react-router-dom";

const steps = ["Shipping address", "Review your order"];

export default function Checkout() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const orders = useSelector((state) => state.saveOrder.orders);
  const [address, setAddress] = React.useState({
    first_name: '',
    last_name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (activeStep == steps.length) {
      // Store Order to pg admin table
      saveToDB();
      dispatch(saveOrder([]));
    }
  }, [activeStep]);

  const saveToDB = () => {
    const url = "http://localhost:5000/orders/addOrder";
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const method = "POST";
    let product_list = {};
    let total = 0;
    orders.forEach((order) => {
      total = total + order.product_quantity * order.product_price;
    });
    orders.forEach((order) => {
      product_list["pid-" + order.product_id] = order.product_quantity;
    });
    const data = {
      total_price: total,
      products: product_list,
    };
    // Continue working here
    const response = post(url, data, method, headers);
    console.log("response is", response);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm address={address} setAddress={setAddress} />;
      case 1:
        return <Review address={address} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Breadcrumbs seperator=">" sx={{ padding: "5% 0 0 0" }}>
          <Link href="/">Home</Link>
          <Link>Checkout</Link>
        </Breadcrumbs>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout & Purchase
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped. Thanks for shopping with Shopping Cart.
              </Typography>
              <CenteredDiv>
                <Button variant="contained" onClick={()=>{navigate('/')}}>Home Page</Button>
              </CenteredDiv>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={orders.length > 0 ? false : true}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
    // <>HELLO</>
  );
}

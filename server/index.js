import express from 'express';
import cors from 'cors';
import authRouter from './routes/userAuth.js';
import productRouter from './routes/products.js';
import OrderRouter from './routes/order.js';

// Initialise express framework
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define user auth and product routes
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/orders', OrderRouter)

// Start server
app.listen(PORT, () => {
    console.log(`Server started and listening to API call at PORT ${PORT}`)
})

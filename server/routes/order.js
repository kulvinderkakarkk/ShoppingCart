import express from 'express';
import { getAllOrders, addOrder, updateOrder, deleteOrder } from '../db/queries/orderDetails.js'

const OrderRouter = express.Router();

//Routes
OrderRouter.get('/allOrders', async(req, res) => {
    const allOrders = await getAllOrders();
    res.send(allOrders)
})

OrderRouter.post('/addOrder', async(req,res) => {
    const newOrder = {
        username: req.body.username,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        total_price: req.body.total_price
    }
    const Order = await addOrder(newOrder);
    res.send(Order);
});

OrderRouter.post('/updateOrder', async(req, res) => {
    const id = req.body.id;
    const quantity= req.body.quantity;
    const total_price= req.body.total_price;

    const updatedOrder = {
        quantity,
        total_price
    }
    const Order = await updateOrder(updatedOrder, id);
    res.send(Order)
})

OrderRouter.post('/deleteOrder', async(req, res) => {
    const id = req.body.id;
    const isDeleted = await deleteOrder(id);
    res.send({status: isDeleted});
})

export default OrderRouter;

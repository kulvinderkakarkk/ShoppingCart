import express from 'express';
import { getAllProductList, addProduct, updateProduct, deleteProduct } from '../db/queries/products.js'

const productRouter = express.Router();

//Routes
productRouter.get('/allProducts', async(req, res) => {
    const allProducts = await getAllProductList();
    res.send(allProducts)
})

productRouter.post('/addProduct', async(req,res) => {
    const newProduct = {
        description: req.body.description,
        title: req.body.title,
        price: req.body.price
    }
    const product = await addProduct(newProduct);
    res.send(product);
});

productRouter.post('/updateProduct', async(req, res) => {
    const id = req.body.id;
    const description = req.body.description;
    const title = req.body.title;
    const price = req.body.price;

    const updatedProduct = {
        description,
        title,
        price
    }
    const product = await updateProduct(updatedProduct, id);
    console.log('product is', product)
    res.send(product)

})

productRouter.post('/deleteProduct', async(req, res) => {
    const id = req.body.id;
    const isDeleted = deleteProduct(id);
    res.send({status: isDeleted});
})

export default productRouter;

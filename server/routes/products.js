import express from 'express';
import { getAllProductList, addProduct, updateProduct, deleteProduct } from '../db/queries/products.js'
import { validateJWT } from '../utils/validate.js'

const productRouter = express.Router();

//Routes
productRouter.get('/allProducts', async(req, res) => {
    const validate = await validateJWT(req);
    if(!validate) {
        res.send({status: false});
        return;
    }

    const allProducts = await getAllProductList();
    res.send({status: true, body: allProducts})
})

productRouter.post('/addProduct', async(req,res) => {
    const validate = await validateJWT(req);
    if(!validate) {
        res.send({status: false});
        return;
    }

    const newProduct = {
        description: req.body.description,
        title: req.body.title,
        price: req.body.price,
    }
    const product = await addProduct(newProduct);
    res.send({status: true, body: product});
});

productRouter.post('/updateProduct', async(req, res) => {
    const validate = await validateJWT(req);
    if(!validate) {
        res.send({status: false});
        return;
    }

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
    res.send({status: true, body: product})

})

productRouter.post('/deleteProduct', async(req, res) => {
    const validate = await validateJWT(req);
    if(!validate) {
        res.send({status: false});
        return;
    }

    const id = req.body.id;
    const isDeleted = deleteProduct(id);
    res.send({status: true, body:isDeleted});
})

export default productRouter;

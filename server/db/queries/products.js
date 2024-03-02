import * as uuid from 'uuid';
import client from '../db.js';

const getAllProductList = async() => {
    const result = await client.query('SELECT * from products');
    return result.rows;
}

const addProduct = async(values) => {
    const id = uuid.v4();
    const newValues = {id,...values}
    const result = await client.query({
        text: 'INSERT INTO products (id, description, title, price) VALUES ($1, $2, $3, $4) RETURNING *',
        values: Object.values(newValues)
    })
    return result.rows[0];
}

const updateProduct = async(values, id) => {
    const result = await client.query({
        text: `UPDATE products SET description = $1, title= $2, price=$3 WHERE id='${id}' RETURNING *`,
        values: Object.values(values)
    })
    return result.rows[0];
}

const deleteProduct = async (id) => {
    const result = await client.query({
        text: 'DELETE FROM products where id=$1',
        values: [id]
    })
    return true;
}

export {getAllProductList, addProduct, updateProduct, deleteProduct};
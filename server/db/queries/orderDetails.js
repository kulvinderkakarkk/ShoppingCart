import * as uuid from 'uuid';
import client from '../db.js';

const getAllOrders = async() => {
    const result = await client.query('SELECT * from orderDetails');
    return result.rows;
}

const addOrder = async(values) => {
    const id = uuid.v4();
    const newValues = {id,...values}
    const result = await client.query({
        text: 'INSERT INTO orderDetails (id, username, product_id, quantity, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: Object.values(newValues)
    })
    return result.rows[0];
}

const updateOrder = async(values, id) => {
    const result = await client.query({
        text: `UPDATE orderDetails SET quantity = $1, total_price= $2 WHERE id='${id}' RETURNING *`,
        values: Object.values(values)
    })
    return result.rows[0];
}

const deleteOrder = async (id) => {
    const result = await client.query({
        text: 'DELETE FROM orderDetails where id=$1',
        values: [id]
    })
    return true;
}

export {getAllOrders, addOrder, updateOrder, deleteOrder};
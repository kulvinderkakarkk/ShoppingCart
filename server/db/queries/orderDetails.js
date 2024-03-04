import * as uuid from "uuid";
import client from "../db.js";

const getAllOrders = async () => {
  const result = await client.query("SELECT * from orderdetails INNER JOIN orderquantity ON orderdetails.id = orderquantity.order_id");
  return result.rows;
};

const addToOrderQuantity = async (values) => {
  await client.query({
    text: "INSERT INTO orderQuantity (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
    values: values
  });
};
const addOrder = async (values, quantity) => {
  const id = uuid.v4();
  const newValues = { id, ...values };
  const result = await client.query({
    text: "INSERT INTO orderdetails (id, username, product_id, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
    values: Object.values(newValues),
  });
  
  values.product_id.forEach((val, index) => {
    let newVal = [id, val, quantity[index]]
    addToOrderQuantity(newVal)
  });
  return result.rows[0];
};

const updateOrder = async (values, id) => {
  const result = await client.query({
    text: `UPDATE orderquantity SET quantity = $1, total_price= $2 WHERE order_id='${id}' RETURNING *`,
    values: Object.values(values),
  });
  return result.rows[0];
};

const deleteOrder = async (id) => {
  const result = await client.query({
    text: "DELETE FROM orderdetails where id=$1",
    values: [id],
  });
  await client.query({
    text: "DELETE FROM orderquantity where id=$1",
    values: [id],
  })
  return true;
};

export { getAllOrders, addOrder, updateOrder, deleteOrder };

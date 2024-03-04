# ShoppingCart
A application lets user to search for products and add to their shopping cart list. 

User stories:
1. User can login.
2. Once logged in, user can search for product and add the desired quantity to shopping cart.
3. Once the user adds an idea, he/she can proceed to checkout page to get an estimate on the purchase and purchase it.

Tech stack used: React (Material UI), Node (Express Framework), Postgres database, REST APIs.

To setup the application, do the following steps:
1. Setup the Postgres database schema.
2. Setup the back-end Node server.
3. Setup the front-end client.

## Setup the Postgres Server

For now, you need to manually create the schema using the following steps.
1. Create database named `test`. 
2. Select the database `test` and run the following queries.

```
CREATE TABLE IF NOT EXISTS public.orderdetails
(
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default",
    product_id text[] COLLATE pg_catalog."default",
    ordered_on date NOT NULL DEFAULT CURRENT_DATE,
    total_price double precision,
    CONSTRAINT orderdetails_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.orderquantity
(
    order_id character varying(100) COLLATE pg_catalog."default",
    product_id character varying(100) COLLATE pg_catalog."default",
    quantity integer,
    CONSTRAINT fk_order_product FOREIGN KEY (order_id)
        REFERENCES public.orderdetails (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.products
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    title character varying(50) COLLATE pg_catalog."default",
    price double precision,
    posted_on date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;
```
Ensure you have the permission to access the table with the listed username. if not, use the following commands to grant roles.

```
GRANT ALL ON TABLE public.orderdetails TO <user_name>;
GRANT ALL ON TABLE public.orderquantity TO <user_name>;
GRANT ALL ON TABLE public.products TO <user_name>;
```
Verify that the tables are created: orderdetails, orderquantity, products

## Setup Back-end Node server
1. cd into the repository
2. cd into server folder.
3. run `npm install` to install required packages.
4. run `npm start` to run server at localhost port 5000.

## Setup Front-end server
1. cd into the repository.
2. cd into client folder.
3. run `npm install` to install required packages.
4. run `npm start` to run server at localhost port 3000.
5. Open the browser and type url http://localhost:3000 to access the website.
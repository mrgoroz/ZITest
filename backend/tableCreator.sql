CREATE TABLE shop_cart(
   id SERIAL PRIMARY KEY,
   name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    amount integer NOT NULL,
    info json NOT NULL
);
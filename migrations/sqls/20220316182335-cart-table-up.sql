CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL
);

INSERT INTO cart(quantity, order_id, product_id) VALUES(10,1,1);
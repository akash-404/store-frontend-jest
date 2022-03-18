CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    userId INTEGER REFERENCES users(id)
);

INSERT INTO orders(status, userId) VALUES('Active',1);
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100)
);

INSERT INTO products(name, price, category) VALUES('demoName',12345,'demoCategory');
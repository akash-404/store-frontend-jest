/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    password VARCHAR
);

INSERT INTO users(username, firstname, lastname, password) VALUES('demoUsername','demoFirstName','demoLastname','demopassword');
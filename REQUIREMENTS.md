# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    - GET  "/products"
    - Receive list of all the products in the products table.
- Show (args: product id)
    - GET "/product/:id"
    - Receive details of a product using its id.
- Create (args: Product)[token required]
    - POST "/products/"
    - Create a new product by sending its name, price and category.
    - Request Data: { name: string, price: number, category: string }
- Remove (args: product id)[token required]
    - DELETE "/product/:id/"
    - Remove a product from the products table using its id. 

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
    - GET "/users"
    - Receive list of all the users in the users table.
- Show (args: id)[token required]
    - GET "/users/:id/"
    - Receive details of a user using its id.
- Create (args: User)[token required]
    - POST "/users/"
    - Create a new user by sending its details.
    - Request Data: { firstName: string, lastName: string, username: string, password: string }
- Remove (args: product id) [token required]
    - DELETE "/users/:id/"
    - Remove a user from the users table using its id. 

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id : serial number PRIMARY KEY
- name : varchar(100)
- price : integer
- [OPTIONAL] category : varchar(100)

#### User
- id : serial number PRIMARY KEY
- username : varchar(100)
- firstName : varchar(100)
- lastName : varchar(100)
- password : varchar

#### Orders
- id : serial number PRIMARY KEY
- user_id : integer FOREIGN KEY
- status of order (active or complete) : varchar(10)

#### Cart
- id : serial number PRIMARY KEY
- order_id : integer FOREIGN KEY
- product_id : integer FOREIGN KEY
- quantity : integer

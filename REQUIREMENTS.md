# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET]
- Show '/products/:id' [GET]
- Create [token required] '/products' [POST] body={name:string,price:number,token:string}
    
#### Users
- Index [token required] '/users' [GET] body={token:string}
- sign in [authentication][gives u the jwt token] '/users/signin' [POST] body={firstname:string,lastname:string,password:string}
- Show [token required] '/users/:id' [GET] body={token:string}
- Create New user '/users' [POST] body={firstname:string,lastname:string,password:string}

#### Orders
- Index [token] '/orders' [GET] body={token:string}
- Current Order by user [token] '/orders/:id' [GET] body={token:string}
- Create order [token] '/orders' [POST] body={product_id:number,quantity:number,user_id:number,status:string,token:string}
- Add product [token] '/orders/add' [POST] body={product_id:number,quantitiy:number,order_id:number,token:string}
- Set Status [token] '/orders/:id' [POST] body={status:string,token:string}

## Data Shapes
#### products
-  id (int serial primary key)
- name (string)
- price (int)

#### users
- id (int serial primary key)
- firstName (string)
- lastName (string)
- password (string)

#### orders
- id (Int serial primary key)
- user_id (Foregin key references users(id))
- status of order (active or complete) (String)

### order_products
- id (Serial primary key)
- order_id (Foreign key references orders(id))
- product_id (Foreign key references products(id))
- quantity (Int)



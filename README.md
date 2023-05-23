# Supply Chain Management Project

This project is a supply chain management system that allows businesses to manage their inventory, track product movement, and handle orders efficiently. It provides a set of RESTful APIs for managing products, orders, and inventory.

## Features

- CRUD operations for products, orders
- Inventory management

## Technologies Used

- Node.js: Backend server environment
- Express.js: Web framework for building RESTful APIs
- Sequelize: ORM (Object-Relational Mapping) for interacting with the database
- PostgreSQL: Relational database for storing data
- Jest: Testing framework for unit and integration tests
- Supertest: Library for testing HTTP requests and responses
- Docker: Containerization for easy deployment and scalability

## Getting Started

- You need to install docker on your computer
  -> To install this follow the official docker documentation [here](https://docs.docker.com/engine/install/)
- You will need to install docker compose
  -> To install this you will need to follow the install docker compose documentation here for your respective environment [here](https://docs.docker.com/compose/install/linux/)

### What happens after the installation

- Containerization allows one to run applications irrespective of the environment
- This will pull the nodejs and postgres images that have been declared in the bd.Dockerfile and docker-compose files
- You will not need to install anything else on your machine

## Project structure

```bash
.
├── README.md
├── backend
│   ├── jest.config.js
│   ├── node_modules  [402 entries exceeds filelimit, not opening dir]
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app.ts
│   │   ├── components
│   │   │   └── schemas
│   │   ├── controllers
│   │   │   ├── auth-controllers.ts
│   │   │   ├── order-controller.ts
│   │   │   └── product-controllers.ts
│   │   ├── database-connection.ts
│   │   ├── index.ts
│   │   ├── models
│   │   │   ├── order.ts
│   │   │   ├── product.ts
│   │   │   └── user.ts
│   │   ├── routes
│   │   │   ├── auth-routes.ts
│   │   │   ├── order-routes.ts
│   │   │   └── product-routes.ts
│   │   ├── sequelize-mock.d.ts
│   │   ├── tests
│   │   │   ├── login-user.test.ts
│   │   │   ├── product-controller.test.ts
│   │   │   ├── register-user.test.ts
│   │   │   ├── test-utils
│   │   │   │   └── auth-utils.ts
│   │   │   └── update-user.test.ts
│   │   └── utils
│   │       └── auth-middlewares.ts
│   └── tsconfig.json
├── bd.Dockerfile
├── docker-compose.yml
├── fd.Dockerfile
└── frontend
    ├── babel.config.js
    ├── jest.config.js
    ├── node_modules  [853 entries exceeds filelimit, not opening dir]
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── redux-devtools-extension.d.ts
    ├── src
    │   ├── App.tsx
    │   ├── components
    │   │   ├── auth
    │   │   │   ├── login.tsx
    │   │   │   └── register.tsx
    │   │   ├── dashboard
    │   │   │   ├── home.tsx
    │   │   │   ├── pages
    │   │   │   │   ├── checkout.tsx
    │   │   │   │   ├── create-product.tsx
    │   │   │   │   ├── inventory.tsx
    │   │   │   │   ├── orders.tsx
    │   │   │   │   ├── page-wrapper.tsx
    │   │   │   │   ├── products.tsx
    │   │   │   │   └── users.tsx
    │   │   │   ├── sidebar.test.tsx
    │   │   │   └── sidebar.tsx
    │   │   └── shared
    │   │       ├── alerts.test.tsx
    │   │       ├── alerts.tsx
    │   │       ├── modal.test.tsx
    │   │       ├── modal.tsx
    │   │       ├── table.test.tsx
    │   │       └── table.tsx
    │   ├── index.css
    │   ├── index.tsx
    │   ├── react-app-env.d.ts
    │   ├── redux
    │   │   ├── actions
    │   │   │   ├── auth-actions.ts
    │   │   │   └── cart-actions.ts
    │   │   ├── reducers
    │   │   │   ├── auth-reducers.ts
    │   │   │   └── cart-reducers.ts
    │   │   ├── store
    │   │   │   └── store.ts
    │   │   └── types.ts
    │   ├── reportWebVitals.ts
    │   ├── setupTests.ts
    │   └── utils
    │       └── protected-routes.tsx
    ├── tailwind.config.js
    └── tsconfig.json

26 directories, 71 files

```

Inside the application root folder, we have two directories

1. frontend
   -> This contains the frontend code written in react js and typescript
   -> The is also redux implementation for state management
   -> Tets are implemented using react testing library and jest
   -> For styling tailwindcss is used and react-icons
2. backend
   -> This is the backend solution written in nodejs, typescript and expressjs
   -> I use Sequelize to conduct database operations like Create,Read, Update, Delete
   -> I use bcrypt to hash passwords and jwt token for generating user tokens
   -> Tests are implemented using jest and supertest
   -> Database implementation is done using PostgreSQL

### Installation and running the application

1. Ensure you have docker running on your machine locally
2. Clone the repository:

   ```bash
   git clone https://github.com/titusdishon/supply-chain-management.git
   cd supply-chain-management
   ```

3. Adding environment variables
   Environment variables hold data that is sensitive about your project configuration
   Here is an example of the env required

   ```env
   DB_HOST=tlp-database
   TEST_DB_NAME=tlp-database-test
   DB_PORT=5432
   DB_NAME=mydatabase
   DB_USER=myuser
   DB_PASSWORD=mypassword
   JWT_SECRET=6Fhy+iXR99FeHeW2etkWn9jdjPIVgoo2u1h2Y4/u69I=

   ```

   The JWT_SECRET is a base 64 encoded string
   Create a .env file in the application root directory and add the content above

4. Running the project

   ```bash
   docker compose build
   #this will build the project images including frontend, backend and postgres
   docker compose up
   # this will run the applications
   docker compose down
   # this will destroy the images created and stop the project
   ```

5. What happens when you run the project?

- Expect to see database operations logs on the console (dev env ) for prod you might need to silence this
- A default admin user will be created with the following attributes

```json
  {
    username: username
    password: password123
  }
```

- You can use the above details to login to the application.

6. The project will be running on the following addresses:

- backend: [address](http://localhost:8000)
- frontend : [address](http://localhost:3000)

## Running Tests

Backend testing:

1. I have added minimal tests which can be run as follows

- From the project root directory run the following commands

```bash
cd backend
npm run test
```

The output should be as below

2. Frontend testing

- From the project root directory run the following commands

```bash
cd frontend
npm run test

```

## Interacting with the application

- You can use postman or the frontend application to interact with the application
- We will use the frontend here
  Open the frontend [url](http://localhost:3000)

## Pages

1. Login.

   -> Login desktop
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/login.png)
   -> login mobile
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/login-mobile.png)

2. Home
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/home.png)
3. Products.

   -> Products list
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/products.png)
   -> Product create
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/product-create.png)
   -> Products with cart
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/products-cart.png)

4. Orders.

   -> Orders create
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/order-create.png)
   -> Orders list
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/orders.png)

5. Users.

   -> Create User
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/create-user.png)
   -> List Users
   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/users.png)

6. Inventory.

   ![Tests](https://github.com/titusdishon/supply-chain-manager/blob/main/docs/inventory.png)

## Below are the APIs incase you would like to use postman

```json
 {
  GET/POST: "http://localhost:8000/orders",
  GET_BY_ID: "http://localhost:8000/orders/:id",
  GET_BY_ID: "http://localhost:8000/orders/orders-progress/:id",
  GET/POST: "http://localhost:8000/products",
  GET: "http://localhost:8000/products/inventory",
  GET_BY_ID: "http://localhost:8000/products/:id",
  POST:  "http://localhost:8000/auth/register",
  GET/POST: "http://localhost:8000/auth/users",
  GET_BY_ID:   "http://localhost:8000/auth/users/:id",
  POST: "http://localhost:8000/auth/login",
  UPDATE_BY_ID:   "http://localhost:8000/auth/update/:id"
 }
```

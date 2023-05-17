# Supply Chain Management Project

This project is a supply chain management system that allows businesses to manage their inventory, track product movement, and handle orders efficiently. It provides a set of RESTful APIs for managing products, orders, and inventory.

## Features

- CRUD operations for products, orders, and inventory management

## Technologies Used

- Node.js: Backend server environment
- Express.js: Web framework for building RESTful APIs
- Sequelize: ORM (Object-Relational Mapping) for interacting with the database
- PostgreSQL: Relational database for storing data
- Jest: Testing framework for unit and integration tests
- Supertest: Library for testing HTTP requests and responses
- Docker: Containerization for easy deployment and scalability

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL database set up

## Project structure

```bash
.
├── README.md
├── backend
│   ├── dist
│   │   └── index.js
│   ├── node_modules  [322 entries exceeds filelimit, not opening dir]
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── controllers
│   │   │   └── product-controllers.ts
│   │   ├── database-connection.ts
│   │   ├── index.ts
│   │   ├── models
│   │   │   └── product.ts
│   │   └── routes
│   │       └── routes.ts
│   └── tsconfig.json
├── bd.Dockerfile
├── docker-compose.yml
└── node_modules
    └── @types
        └── semver
            ├── LICENSE
            ├── README.md
            ├── classes
            │   ├── comparator.d.ts
            │   ├── range.d.ts
            │   └── semver.d.ts
            ├── functions
            │   ├── clean.d.ts
            │   ├── cmp.d.ts
            │   ├── coerce.d.ts
            │   ├── compare-build.d.ts
            │   ├── compare-loose.d.ts
            │   ├── compare.d.ts
            │   ├── diff.d.ts
            │   ├── eq.d.ts
            │   ├── gt.d.ts
            │   ├── gte.d.ts
            │   ├── inc.d.ts
            │   ├── lt.d.ts
            │   ├── lte.d.ts
            │   ├── major.d.ts
            │   ├── minor.d.ts
            │   ├── neq.d.ts
            │   ├── parse.d.ts
            │   ├── patch.d.ts
            │   ├── prerelease.d.ts
            │   ├── rcompare.d.ts
            │   ├── rsort.d.ts
            │   ├── satisfies.d.ts
            │   ├── sort.d.ts
            │   └── valid.d.ts
            ├── index.d.ts
            ├── internals
            │   └── identifiers.d.ts
            ├── package.json
            ├── preload.d.ts
            └── ranges
                ├── gtr.d.ts
                ├── intersects.d.ts
                ├── ltr.d.ts
                ├── max-satisfying.d.ts
                ├── min-satisfying.d.ts
                ├── min-version.d.ts
                ├── outside.d.ts
                ├── simplify.d.ts
                ├── subset.d.ts
                ├── to-comparators.d.ts
                └── valid.d.ts

15 directories, 56 files

```

### Installation and running the application

1. Ensure you have docker running on your machine locally
2. Clone the repository:

   ```bash
   git clone https://github.com/titusdishon/supply-chain-management.git
   cd supply-chain-management
   docker compose up
   ```

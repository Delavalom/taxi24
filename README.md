# Taxi24

## Getting Started

### Step 1: Clone the Repository

```bash
$ git clone https://github.com/Delavalom/taxi24.git
```

### Step 2: Install Dependencies

```bash
$ npm install
```

### Step 3: Set up Postgres Database

Get the PostGIS image and create a PostgreSQL database and run a container of that image to get and up and running database.

```bash
$ npm run postgres:run
```

### Step 4: Add Environment Variables

Create a `.env` file in the root directory and point it to your local PostgreSQL database.

Example `.env` file:

```
DATABASE_URL=postgresql://username:password@localhost:5432/yourdatabase
```

### Step 5: Run Migrations

```bash
$ npx prisma migrate dev
```

### Step 6: Run Tests

Make sure everything is set up correctly by running the tests:

```bash
$ npm run test:e2e
```

This should ensure that your environment is properly configured, and the application is ready to run.

### Step 7: Run the Server

```bash
$ npm start:dev
```

### Step 8: Import Postman Collection

If you prefer using Postman, you can import the collection provided in the repository. This allows you to interact with the API seamlessly.

## Documentation

This repository leverages the PostGIS extension for spatial functionality. To gain a deeper understanding, refer to the following links:

- **Set up with Prisma:** Learn about integrating PostGIS with Prisma in the [Prisma Documentation](https://www.prisma.io/docs/orm/prisma-schema/postgresql-extensions).
- **Constraints:** Explore important constraints related to PostGIS in this insightful blog post: [Constrains About PostGIS](https://freddydumont.com/blog/prisma-postgis).
- **Functions:** Refer to the official PostGIS documentation on functions: [PostGIS Functions](https://postgis.net/docs/manual-3.4/reference.html#SRS_Functions).
- **Geometry Type:** Understand the various geometry types by checking the official documentation: [Geometry Type](https://postgis.net/docs/manual-3.4/GeometryType.html).
- **Spatial Indexes:** Delve into the importance of spatial indexes with PostGIS: [Spatial Indexes](https://postgis.net/docs/manual-3.4/using_postgis_query.html#using-query-indexes).
- **ST_DWithin:** Explore practical tips and insights regarding the ST_DWithin function: [ST_DWithin](https://postgis.net/documentation/tips/st-dwithin/).

For comprehensive guidance on using Prisma, visit their [official documentation](https://www.prisma.io/docs/orm). The documentation is well-crafted and provides valuable insights into leveraging Prisma effectively.

// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Database connection
const { connectToDatabase } = require("./database/db");
// Importing Internal Routers
const authRouter = require("./router/authRouter");
const sellerRouter = require("./router/gameRouter");
const userRouter = require("./router/userRouter");

// Setting up the app
const app = express();
app.use(bodyParser.json());



const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Routes
// Authentication Router
app.use("/auth", authRouter);

// Seller Router
app.use("/seller", sellerRouter);

// User Router
app.use("/user", userRouter);

async function startServerAndDatabase() {
  await connectToDatabase();
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server live at ${process.env.PORT || 3000}`)
  );
}

startServerAndDatabase();

// Swagger Configurations
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for your project',
      version: '1.0.0',
      description: 'Description of your API',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'Your Name',
        url: 'https://yourwebsite.com',
        email: 'your@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  // Specify the path to your API routes
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log('Swagger UI setup complete');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

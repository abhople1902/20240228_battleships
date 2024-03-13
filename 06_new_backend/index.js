// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors")

// Database connection
const { connectToDatabase } = require("./database/db");
// Importing Internal Routers
const authRouter = require("./router/authRouter");
const gameRouter = require("./router/gameRouter");
const userRouter = require("./router/userRouter");

// Setting up the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Routes
// Authentication Router
app.use("/auth", authRouter);

// Game Router
app.use("/game", gameRouter);

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
    openapi: "3.0.0",
    info: {
      title: "Express API for your project",
      version: "1.0.0",
      description: "Description of your API",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "Your Name",
        url: "https://yourwebsite.com",
        email: "your@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, but good to specify if using JWTs
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./router/*.js"], // Specify the path to your API routes
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log("Swagger UI setup complete");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

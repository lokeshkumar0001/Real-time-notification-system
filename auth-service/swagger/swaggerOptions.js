const swaggerJsdoc = require("swagger-jsdoc");
const components = require("./components.js");
const paths = require("./paths");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication API",
      version: "1.0.0",
      description: "API endpoints for user registration and authentication",
    },
    paths,
    components,
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(swaggerOptions);

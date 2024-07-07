const swaggerJsdoc = require("swagger-jsdoc");
const components = require("./components");
const paths = require("./paths");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Notification API",
      version: "1.0.0",
    },
    components: components.components,
    paths: paths.paths,
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(swaggerOptions);

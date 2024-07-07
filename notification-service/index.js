const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerOptions.js");
const notificationRoutes = require("./routes/notificationRoutes");
const { connectRabbitMQ } = require("./services/rabbitMQ");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

connectDB();
connectRabbitMQ();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/notifications", notificationRoutes);

// Use error handling middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Notification service running on port ${process.env.PORT}`);
});

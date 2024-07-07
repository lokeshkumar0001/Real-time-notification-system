const express = require("express");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler.js")
const authRoutes = require("./routes/authRoutes.js");
const swaggerDocs = require("./swagger/swaggerOptions.js");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to database
connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api", authRoutes);

// Use error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});

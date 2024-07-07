const { AppError } = require("../utils/errorThrower");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  // Default to 500 if it's not an instance of AppError
  res.status(500).json({
    success: false,
    status: "error",
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;

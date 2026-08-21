// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  console.error("========== ERROR ==========");
  console.error(`${req.method} ${req.originalUrl}`);
  console.error(err.stack);
  console.error("===========================");

  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;

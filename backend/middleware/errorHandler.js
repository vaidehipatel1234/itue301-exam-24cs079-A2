// Global error handler - always the LAST middleware
// Returns clean JSON instead of exposing raw error stack
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;

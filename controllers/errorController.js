const sendErrorDev = (err, req, res) =>
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    message: err.message,
  });

const sendErrorProd = (err, req, res) => {
  // B) RENDERED WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      message: err.message,
    });
  }
  return res.status(500).render('error', {
    title: 'Something went very wrong',
    message: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    const error = { ...err };
    error.message = err.message;
    sendErrorProd(error, req, res);
  }
};

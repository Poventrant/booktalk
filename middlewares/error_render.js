// ErrorPage middleware
exports.error_page = function (req, res, next) {

  res.render404 = function (error) {
    return res.status(404).render('error_notify', { error: error });
  };

  res.renderError = function (error, statusCode) {
    if (statusCode === undefined) {
      statusCode = 400;
    }
    return res.status(statusCode).render('error_notify', { error: error });
  }; 

  next();
};

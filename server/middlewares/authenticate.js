exports.authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send('Please login to access this route!')
  }
  next()
}

exports.authenticateDriver = (req, res, next) => {
  if (!req.session.driver) {
    return res.status(401).send('Please login to access this route!')
  }
  next()
}

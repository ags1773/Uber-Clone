exports.authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).redirect('/')
  }
  next()
}

exports.authenticateDriver = (req, res, next) => {
  if (!req.session.driver) {
    return res.status(401).redirect('/')
  }
  next()
}

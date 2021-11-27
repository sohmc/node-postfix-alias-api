module.exports = {
  async getDomains(req, res, next) {
    res.send('getDomains: ' + req);
    next();
  }
};
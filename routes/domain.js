module.exports = {
  async getDomains(req, res, next) {
    // res.send('getDomains: ' + JSON.stringify(req.params));

    let domains = [];
    if (req.params.hasOwnProperty('domain'))
      domains = req.db.prepare(`SELECT * FROM domains WHERE domain = ?`).all(req.params.domain);
    else if (req.params.hasOwnProperty('q'))
      domains = req.db.prepare(`SELECT * FROM domains WHERE domain LIKE ?`).all('%' + req.params.q + '%');
    else 
      domains = req.db.prepare(`SELECT * FROM domains`).all();
    
    if (domains.length > 0)
      res.send(domains);
    
    next(); 
  }
};
var restify = require('restify');
const routes = require('./routes');


function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get('/domain', routes.domain.getDomains);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
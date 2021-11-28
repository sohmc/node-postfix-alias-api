require("dotenv").config();
const sqlite3 = require("better-sqlite3");

// Winston Logger Declarations
const winston = require('winston');
var log_level = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: log_level,
  transports: [
    new winston.transports.Console({format: winston.format.combine(winston.format.colorize(), winston.format.simple())}),
    new winston.transports.File({filename: 'logs/combined.log'})
  ]
});

var db = undefined;
try {
  db = new sqlite3(process.env.DBFILE, {fileMustExist: true});
  logger.info("Database connection established: " + process.env.DBFILE);
} catch (connectionError) {
  logger.error(connectionError);
  process.exit(1);
}

var restify = require('restify');
const routes = require('./routes');


var server = restify.createServer();

server.get('/domain', routes.domain.getDomains);
server.pre(function (req, res, next) {
  req.db = db;
  req.logger = logger;
  return next();
});

server.use(restify.plugins.queryParser({mapParams: true}));
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
// var settings = require('../settings'),
//     Db = require('mongodb').Db,
//     Connection = require('mongodb').Connection,
//     Server = require('mongodb').Server;
// module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe: true});
// ***********************************
// -----------------------------------
var mongodb = require('mongodb');

var dbServer = new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST,parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT)),
	db = new mongodb.Db('v2push', dbServer, {auto_reconnect: true}),
	dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME,
	dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
	ipaddr  = process.env.OPENSHIFT_NODEJS_IP;
  	port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

module.exports = db;

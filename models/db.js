// var settings = require('../settings'),
//     Db = require('mongodb').Db,
//     Connection = require('mongodb').Connection,
//     Server = require('mongodb').Server;
// module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe: true});
    var mongojs = require('mongojs');
    var dbName = "/v2push";
    var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;
    var db = mongojs(connection_string, ['data']);
    // var books = db.collection('data');
    module.exports = db;

    // db.scores.find(function(err, docs) {
    //    res.send(docs); 
    // });

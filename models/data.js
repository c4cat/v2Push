var mongodb = require('./db');

module.exports = Data;

//auth for openshift
var dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME,
    dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

//date
function date(){
  var myDate = new date();
  var time= {
      d : myDate.toLocaleDateString(),
      h : myDate.getHours(),
      m : myDate.getMinutes(),
      s : myDate.getSeconds()
    }
  return time;
}

function Data(data) {
  this.id = data.id;
  this.time = data.time;
  this.log = data.log;
}

//save data
Data.prototype.save = function(callback) {
  //save doc
  var data = {
      _id: '517',
      id: this.id,
      time: this.time,
      log: this.log
  };
  //open db
  mongodb.open(function (err, db) {
    if (err) {return callback(err);}
    //auth
    //4 openshift 
    db.authenticate(self.dbUser, self.dbPass, {authdb: "admin"}, function(err, res){
      if(err){ throw err };
      //read data
      db.collection('data', function (err, collection) {
      if (err) {mongodb.close(); return callback(err,'err');}
      //insert
      collection.save(data, {safe: true}, function (err, data) {
          mongodb.close();
          if (err) {return callback(err); }
          callback(null,'save');
      });
    });
  });
  }); //end auth
};

//get data
Data.prototype.get = function(id,callback) {
  mongodb.open(function (err, db) {
    if (err) {return callback(err);}
    db.collection('data', function (err, collection) {
      if (err) {mongodb.close(); return callback(err);}
      //find _id:517
      collection.findOne({
        _id: id
      }, function (err, data) {
        mongodb.close();
        if (err) {return callback(err);}
        callback(null, data);
      });
    });
  });
};
var mongodb = require('./db');

module.exports = Data;

//日期
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

//存储用户信息
Data.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var data = {
      _id: '517',
      id: this.id,
      time: this.time,
      log: this.log
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {return callback(err);}//错误，返回 err 信息 
    //读取 data 集合
    db.collection('data', function (err, collection) {
      if (err) {mongodb.close(); return callback(err,'err');}//错误，返回 err 信息 }
      //将用户数据插入 users 集合
      collection.save(data, {safe: true}, function (err, data) {
          mongodb.close();
          if (err) {return callback(err); }//错误，返回 err 信息
          callback(null,'save');//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

//读取用户信息
Data.prototype.get = function(id,callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {return callback(err);}//错误，返回 err 信息 
    //读取 users 集合
    db.collection('data', function (err, collection) {
      if (err) {mongodb.close(); return callback(err);}//错误，返回 err 信息
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        _id: id
      }, function (err, data) {
        mongodb.close();
        if (err) {return callback(err);}//失败！返回 err 信息
        callback(null, data);//成功！返回查询的用户信息
      });
    });
  });
};
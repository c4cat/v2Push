/*
 * GET home page.
 */
var User = require('../models/data.js');


module.exports = function(app) {
  app.get('/', function (req, res) {
  res.render('index', { title: 'Express' });

  var name = 'mrc';

  var newUser = new User({
      name: name,
  });

  //检查用户名是否已经存在 
  // User.get(newUser.name, function (err, user) {
    // if (user) {console.log('exists!');}
    //如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
      	console.log('err1');
      }
      req.session.user = user;//用户信息存入 session
      console.log('done!');
    });
  // });

});
};
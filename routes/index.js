/*
 * GET home page.
 */
var dataJs = require('../models/data.js');

function R_timestamp(nS) {     
   return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
}   

module.exports = function(app) {
  app.get('/', function (req, res) {

    var newData = new dataJs({
      id : ' ',
      time : ' '
    });
    newData.get('517',function(err,data){
      res.render('index', { 
        title: 'v2Push',
        state: 'working...',
        // log : ,
        time: R_timestamp(data.time)
      });
    });
});
};
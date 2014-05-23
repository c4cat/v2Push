//mrc
//i#cornelia.in
//2014年5月22日10:29:26
//v2ex daily
//nodejs

var request = require('request').defaults({jar: true}),
    cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');

  //   opt = {
  //       host: '222.66.115.233',
  //       port: '80',
  //       method: 'GET',
  //       path: 'http://www.v2ex.com/signin',
  //       headers: {
  //   	"User-Agent": "UA",
  //   	"Host": "v2ex.com",
  //   	"Origin": "http://v2ex.com",
  //   	"Referer": "http://www.v2ex.com/signin"
		// },
  //   };

var	username = "co2",
	pwd = "313187850",
	index_url = "http://www.v2ex.com",
	login_url = "http://www.v2ex.com/signin",
	once = '',
	daily_url = "http://www.v2ex.com/mission/daily";

var options_login = {
	url : 'http://www.v2ex.com/signin',
	headers : {
    	"User-Agent": "UA",
    	"Host": "v2ex.com",
    	"Origin": "http://v2ex.com",
    	"Referer": "http://www.v2ex.com/signin"
	},
	form : {next:"/",u:username,p:pwd,once:once,next:"/"},
}  

// function action(){
// 	var body = '';
// 	var req = http.request(opt, function(res) {
//   		console.log("Got response: " + res.statusCode);
//   		res.on('data',function(d){
//  		 	body += d;
//  		}).on('end', function(){
//   			console.log(res.headers)
//   			var $ = cheerio.load(body);
//   			once = $('input').eq(3).attr('value');
//   			console.log('once:'+once);
//  		});

// }).on('error', function(e) {
//   console.log("Got error: " + e.message);
// })
// req.end();
// }  

function action(){
	request(options_login,function(err,res,data){
		if(!err && res.statusCode == 200){
			var $ = cheerio.load(data);
				once = $('input').eq(3).attr('value');

			request.post({
				url : login_url,
				headers :{"User-Agent": "UA","Host": "v2ex.com","Origin": "http://v2ex.com","Referer": "http://www.v2ex.com/signin"},
				form : {next:"/",u:username,p:pwd,once:once,next:"/"},
				jar : true
			},function(err,res,data){
				console.log('data'+data);
				console.log('err:'+err);
				console.log('res:'+res);
				console.log('fxxk');
			});

			console.log('once:'+once);	
		}else{
			console.log(err);
		}		
	});
	setTimeout(action,1000*3);
}
//action();  
demo()

function demo(){
	request(options_login,function(err,res,data){
		if(!err && res.statusCode == 200){
			var $ = cheerio.load(data);
			once = $('input').eq(3).attr('value');
			console.log(once);
			}
	});
	
	setTimeout(demo,1000*3);
}
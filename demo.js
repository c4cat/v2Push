//mrc
//i#cornelia.in
//2014年5月22日10:29:26
//v2ex daily
//nodejs

var request = require('request'),
    cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');


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
	jar : true
}    
  

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
				console.log('err'+err);
				//console.log(res);
				console.log('fxxk');
			});

			console.log('once:'+once);	
		}else{
			console.log(err);
		}		
	});
	// setTimeout(action,1000*3);
}

action();
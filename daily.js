//mrc
//i#cornelia.in
//2014年5月22日10:29:26
//v2ex daily
//nodejs

var request = require('request').defaults({jar: true}),
    cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');

var	username = "co2",
	pwd = "313187850",
	index_url = "http://www.v2ex.com",
	login_url = "http://www.v2ex.com/signin",
	daily_url = "http://www.v2ex.com/mission/daily";

var options_login = {
	url:'http://www.v2ex.com/signin',
	headers : {
    	"User-Agent": "UA",
    	"Host": "v2ex.com",
    	"Origin": "http://v2ex.com",
    	"Referer": "http://www.v2ex.com/signin"
	}
}    

get_once_value();

function get_once_value(){
	console.log('Working...Please wait...');
	request(options_login,get_once_value_cb);
}

function get_once_value_cb(err,res,body){
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(body),
			//the 3rd input tag
		 	once = $('input').eq(3).attr('value');
		 // console.log(once);
		 login(once);
	}else{
		 console.log(err);
	}
}

function get_post_data(once){
	post_data = {
        "u": username,
        "p": pwd,
        "once": once,
        "next": "/"
    }
    return post_data;
}

// var post_option = {
// 	url : login_url,
// 	headers : {
//     	"User-Agent": "UA",
//     	"Host": "v2ex.com",
//     	"Origin": "http://v2ex.com",
//     	"Referer": "http://www.v2ex.com/signin"
// 	},
// 	form : {
// 		next: "/",
//         u: username,
//         p: pwd,
//         once: once,
//         next: "/"
// 	}
// }


function login(once){
	// var post_data = get_post_data(once);
	//console.log(post_data);
	request.post({
		url : login_url,
		headers :{"User-Agent": "UA","Host": "v2ex.com","Origin": "http://v2ex.com","Referer": "http://www.v2ex.com/signin"},
		form : {'next':'/','u':username,'p':pwd,'once':once,'next':'/'}
	},login_cb);
}

function login_cb(err,res,body){
	if(!err){
		console.log('Login success!');
		// console.log(res);
		request(index_url,get_balance);
	}else{
		console.log(err);
	}	
}

function get_balance(err,res,body){
	if(!err){
		var $ = cheerio.load(body),
			money = $('#money').html(),
			//reg
			r = /\>.*?(?=\<img)/g,
			rs = money.match(r),
			//
			balance ='';
		for(var i=0;i<rs.length;i++){
  	 		balance+=rs[i].slice(1).replace(/[ ]/g,"");
		}
		console.log('ur balance:'+ balance);
		//get corn
		request.get(daily_url,get_daily_once);

	}else{
		console.log(err);
	}
}

function get_daily_once(err,res,body){
	if(!err){
		var $ = cheerio.load(body),
			daily_onclick =  $('.super').attr('onclick'),
			//reg
			r = /\/.*?(?=')/g,
			rs = daily_onclick.match(r)[0],
			//reg
			link = index_url + rs;
			if(rs!=''){
				request(link,log);
			}else{
				console.log('Maybe u have already get or some err happen!!');				
			}

	}else{
		console.log(err);
	}
}

function log(err,res,body){
	if(!err){
		var $ = cheerio.load(body),
			money = $('#money').html(),
			//reg
			r = /\>.*?(?=\<img)/g,
			rs = money.match(r),
			//
			balance ='';
		for(var i=0;i<rs.length;i++){
  	 		balance+=rs[i].slice(1).replace(/[ ]/g,"");
		}
		console.log('GET!!');
		console.log('now ur balance:' + balance);

	}else{
		console.log(err);
	}
}
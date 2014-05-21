//mrc
//i#cornelia.in
//2014年04月27日22:15:41
//action

exports.action = action;

var request = require('request'),
    cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs'),
    sendMail = require("./mail.js"),
    dataJs = require("./data.js");
// global
var keyword = ['外包','赠送','的活','wordpress','做页面','帮忙','切图','建站','有偿','网站'],
    json_host = 'http://www.v2ex.com/api/topics/latest.json',
    last_id = '', 
    count = 0,
    save = [];
//deal with the date
function date(){
  var myDate = new Date();
  var time= {
      d : myDate.toLocaleDateString(),
      h : myDate.getHours(),
      m : myDate.getMinutes(),
      s : myDate.getSeconds()
    }
  return time;
}
//do the action
function action(){
  var time,
      log ='',
      std = 1000 * 60 * 10; //10 minutes
      //std = 1000 * 60;
  save = [];

  if(date().h < 8){    
    console.log('sleeping...');
  }else{
    getInfofromDB();
  }
  setTimeout(action,std);//loop
}
//get data from db
function getInfofromDB(){
	var newData = new dataJs({
		id : ' ',
		time : ' '
		});
	newData.get('517',function(err,data){
		last_id = data.id;
		console.log(last_id);
		getJSON();
	});
} 
//get json
function getJSON(){
    request(json_host,handleData);
}
//timestamp 2 time
function R_timestamp(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}   
//time 2 timestamp
function timestamp() { 
	var timestamp = Date.parse(new Date()); 
	return timestamp; 
} 
// simple callback
function cb(err,msg){
	if(err){
		console.log(err);
	}else{
		console.log(msg);
	}
}
// after download the json
function handleData(err,res,data){
    var d = JSON.parse(data);// string to json
    // object
    var newData = new dataJs({
		id : d[0].id,
		time : timestamp()
	});
    //save to db
    newData.save(cb);
    format(d);
}
//email format
function format(json_data){
  var mail_format = '',
      k = 0, //count
      loop = json_data[0].id - last_id, //loop time
      mail_format_footer = '<div style="BORDER-TOP:1PX SOLID #000;MARGIN-TOP:50PX;"><p style="text-align:left;line-height:2;color: #aaa;">' + date().d + ' , '+ date().h + ':' + date().m + ':' + date().s + '<\/p><\/div>';
      if(loop > 20){
        loop = 20;
      }
      console.log(loop);

   for(var i = 0; i < loop ;i++){
        for(var j = 0; j < keyword.length;j++){
            if(json_data[i].title.indexOf(keyword[j]) != -1 || json_data[i].node.id == '190' || json_data[i].node.id == '551'){
              // if(true){ //test
                k++; //count
                save.push(json_data[i].id);
                if(json_data[i].content == ''){
                  var content ='fxxk!';
                }else{
                  var content =json_data[i].content;
                }
                var mail_content = '<div style="border-bottom:1px solid #ccc;MARGIN:10PX 0;"><a style="COLOR: #000; TEXT-DECORATION: none; DISPLAY: block; WIDTH: 560px; OVERFLOW:HIDDEN;font-size:16px;" href="'+ json_data[i].url +'" target="_blank"><span>['+ k +']. <\/span>'+ json_data[i].title +'<\/a><p style="color:#999;margin:0;text-indent:20px;line-height:2;WIDTH: 540px;OVERFLOW:HIDDEN;font-size:12px;">'+ content +'<\/p><\/div>';
                mail_format += mail_content;
                break;
            }else{

            }   //end if
        }    
   }   

   mail_format += mail_format_footer;
   console.log(save); 
   checkUpdate(k,mail_format);
}
//mail or not mail
function checkUpdate(k,mail_format){
  if(k == 0){
    console.log('No data!');
    return false;
  }else{ 
    sendMail.sendMail(mail_format);
    console.log('send');
  }
}

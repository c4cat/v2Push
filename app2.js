//mrc
//i#cornelia.in
//2014年04月27日22:15:41

var request = require('request'),
    cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs'),
    sendMail = require("./mail.js");

// global
var keyword = ['外包','赠送','的活','wordpress','做页面','帮忙','切图','建站','有偿'],
    json_host = 'http://www.v2ex.com/api/topics/latest.json',
    last_id = 0,
    log;
var save = [];

action();

function action(){
  var h = date().h,
      time,
      //std = 1000 * 60; //1 minutes
      std = 1000 * 2;

  if(h > 22 || h < 8){ //10点之后,4小时一次, 
    time = std * 60 * 4;
    console.log('Good evening, every 4 hours.');
  }else if(h > 9 && h < 17){ //上班时间,15分钟一次
    time = std * 15;
    console.log('Working time, every 15 minutes.');
  }else if(h > 16 && h < 21 ){ //最频繁的,5分钟一次
    time = std * 5;
    console.log('Busy time, every 5 minutes.');
  }else{ //其他时间,30分钟一次,
    time = std * 30;
    console.log('Common time ,every 30 minutes.');
  }

  getJSON();

  setTimeout(action,time);
}

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

function getJSON(){
    request(json_host,handleData);
}

// string to json
function strToJson(str){ 
  return JSON.parse(str); 
} 

// after download the json
function handleData(err,res,data){
    data = strToJson(data);
    format(data);
}


function format(json_data){
  var mail_format = '',
      k = 0, //count
      loop = 0; //loop time
      mail_format_footer = '<div style="BORDER-TOP:1PX SOLID #000;MARGIN-TOP:50PX;"><p style="text-align:left;line-height:2;color: #aaa;">' + date().d + ' , '+ date().h + ':' + date().m + ':' + date().s + '<\/p><\/div>';
  if(last_id == 0){
    loop = 20;
  }else{
    loop = json_data[0].id - last_id;
  }

   for(var i = 0;i<loop && json_data[0].id > last_id;i++){
        for(var j = 0;j<keyword.length;j++){
            // if(json_data[i].title.indexOf(keyword[j]) != -1 || json_data[i].node.id == '190' || json_data[i].node.id == '551'){
              if(true){ //test
                k++; //count
                save.push(json_data[i].id);
                if(json_data[i].content == ''){
                  var content ='NULL!';
                }else{
                  var content =json_data[i].content;
                }

                var mail_content = '<div style="border-bottom:1px solid #ccc;MARGIN:10PX 0;"><a style="COLOR: #000; TEXT-DECORATION: none; DISPLAY: block; WIDTH: 560px; OVERFLOW:HIDDEN;font-size:16px;" href="'+ json_data[i].url +'" target="_blank"><span>['+ k +']. <\/span>'+ json_data[i].title +'<\/a><p style="color:#999;margin:0;text-indent:20px;line-height:2;WIDTH: 540px;OVERFLOW:HIDDEN;font-size:12px;">'+ content +'<\/p><\/div>';
                
                mail_format += mail_content;

                break;
            }else{
                // console.log(json_data[i].id+'.404');
                // break;
            }   //end if
        }    
   }   

   mail_format += mail_format_footer;
   console.log(save); 
   save = [];

   checkUpdate(json_data,mail_format,k);
}

function checkUpdate(json_data,mail_format,k){
  console.log('id:'+json_data[0].id +',last_id:'+last_id);

  if(json_data[0].id == last_id){
    console.log('No update!');
    return false;
  }else if(k == 0){
    console.log('No data!');
    return false;
  }else{ 
    // sendMail.sendMail(mail_format);
    console.log('send');
  }
  last_id = json_data[0].id;
}

//show.json?id = 
http.createServer(function (req, res) {
  fs.readFile('latest.json',function(err,data){
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(data);
  });
}).listen(process.env.PORT || 1337, null);


console.log('Server running at localhost:1337');
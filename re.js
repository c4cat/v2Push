var a = "location.href = '/mission/daily/redeem?once=68293';",
	// r = /\>.*?(?=\<img)/g;
	r = /\/.*?(?=')/g;

var rs = a.match(r);
var balance = '';

// for(var i=0;i<rs.length;i++){
//   	 balance+=rs[i].slice(1).replace(/[ ]/g,"");
// }
console.log(rs);	


// nodemailer
// i#cornelia.in
// 2014年4月29日15:41:30

var nodemailer = require("nodemailer");

// nodemailer send mail
exports.sendMail = function(html){
  var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "smtp.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "779079880@qq.com", // 账号
      pass: "9oo517" // 密码
    }
  });
// 设置邮件内容
  var mailOptions = {
    from: "c4cat<779079880@qq.com>", // 发件地址
    to: "313187850@qq.com", // 收件列表
    // to: "i@cornelia.in", // 收件列表
    subject: "喵", // 标题
    html: html // html 内容
  }
// 发送邮件
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Done! Message sent: " + response.message);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });
}
//end function send_mail()

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mandrill = require('mandrill-api/mandrill');//如果不用Mandrill则不用这行

var filePath = __dirname+"/comment_history.txt";//留言的存储文件
var endPoint = "/message_board";

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var mandrill_client = new mandrill.Mandrill('你的Mandrill KEY');

function getFileDataInJson(){
    var jsonData = JSON.parse(fs.readFileSync("./html/chart.html"));
    return jsonData;
}
//读取历史留言
app.get(endPoint, function (req, res) {
    res.header('Access-Control-Allow-Origin'  , '*' );

    res.sendFile("./html/chart.html");
});
//去掉用户留言里的HTML tag
function stripUserInput(input){
    if(input)
        return input.replace(/(<([^>]+)>)/ig,"");
}
//Post留言
app.post(endPoint, function (req, res) {

    res.header('Access-Control-Allow-Origin'  , '*' );

    var newMessageObj = {};
    newMessageObj.name = stripUserInput(req.body.name);
    newMessageObj.email = stripUserInput(req.body.email);
    newMessageObj.message = stripUserInput(req.body.message);
    newMessageObj.website = stripUserInput(req.body.website);
    var isPrivateMessage = req.body.isPrivate;
    //邮件提醒博主有新留言
    sendEmail(newMessageObj.name, newMessageObj.email, newMessageObj.website, newMessageObj.message);

    if(isPrivateMessage==="true"){//如果是Private留言，不要存入文件

        res.end("Your private message was sent successfully. Thank You!");
        return;
    }

    var historyComments;
    try{
        historyComments = getFileDataInJson();
    }catch (err){
        historyComments = [];
    }

    historyComments.push(newMessageObj);
    fs.writeFile(filePath, JSON.stringify(historyComments,null,4), function(err) {
        if(err) {
            res.end("Failed to leave message. Sorry!");
            return;
        }
        res.end("Your public message was sent successfully. Thank You!");
    });
});

var server = app.listen(1234, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host +port);
    console.log('message board app listening at http://%s:%s', host, port);
});

//下面的sendEmail代码是针对Mandrill的服务的
function sendEmail(name, email, website, msg){

    var message = {
        "html": msg+"<br/><br/>Visitor's website: "+website,
        "text": "User input no content",
        "subject": "Received Message From your message board",
        "from_email": email,
        "from_name": name,
        "to": [{
            "email": "你的邮箱",
            "name": "ArchiTech",
            "type": "to"
        }],
        "headers": {
            "Reply-To": email
        }
    };

    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);

    }, function(e) {

        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);

    });
}

var http = require('http');
var querystring = require('querystring');
var urlTool = require('url');
var jade = require('jade');
var fs = require('fs');
var validator = require('./validator.js');

var users = {};

http. createServer( function(req, res)
{
    switch(req.url)
    {
        case '/validator.js':
            sendFile(res, 'validator.js', 'text/javascript');
            break;
        case '/signup.js':
            sendFile(res, 'signup.js', 'text/javascript');
            break;
        case '/style.css':
            sendFile(res, 'style.css', 'text/css');
            break;
        case '/images/bgimage.jpg':
			sendFile(res, 'images/bgimage.jpg', 'image/jpg');
            break;
        case '/images/icon1.png':
			sendFile(res, 'images/icon1.png', 'image/png');
			break;
        default:
            req. method === 'POST' ? registUser(req, res) : sendHtml(req, res);
    }
}).listen(8000);

console.log("Sign up server is listening at 8000");

function sendFile(res, filepath, mime)
{
    res.writeHead(200, {"Content-Type": mime});
    res.end(fs.readFileSync(filepath));
}

function registUser(req, res)
{
    req.on('data', function(chunk)
    {
        try
        {
            var user = parseUser(chunk.toString());
            checkUser(user);
            users[user.username] = user;
            res.writeHead(301, {Location: '?username=' + user.username});
            res.end();
        }
        catch(error)
        {
            console.warn("regist error: ", error);
            showSignup(res, user, error.messgae);
        }
    });
}

function checkUser(user)
{
    var errorMessages = [];
    for(var key in user)
    {
        if(!validator.isFieldValid(key, user[key]))
            errorMessages.push(validator.form[key].errorMessages);
        if(!validator.isAttrValueUnique(users, user, key)) 
            errorMessages.push("key: " + key + " is not unique by value: " + user[key]);
        if (errorMessages.length > 0) 
            throw new Error(errorMessages.join('<br/>'));
    }
}

function parseUser(message)
{
    params = message.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
    var user = {username: params[1], sid: params[2], phone: params[3], email: decodeURIComponent(params[4])};
    console.log("user parsed is: ", user);
    return user;
}

function sendHtml(req, res)
{
    var username = parseUsername(req);
    if(!username || !isRegisted(username))
    { 
        showSignup(res, {username: username}, null);
    }
    else
    {
        showDetail(res, users[username]);
    }
}

function parseUsername(req)
{
    return querystring.parse(urlTool.parse(req.url).query).username;
}

function isRegisted(username)
{
    return !!users[username];
}

function showSignup(res, user, error)
{
    showHtml(res, 'signup.jade', {user: user, error: error});
}

function showDetail(res, user)
{
    showHtml(res, 'detail.jade', user);
}

function showHtml(res, template, data)
{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(jade.renderFile(template, data));
}
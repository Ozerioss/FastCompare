/*const http = require('http');

const url = require('url');

const fs = require('fs');
const hostname = '127.0.0.1'

const port = 3000;


fs.readFile('index.html', (err,html) =>
{
	if(err)
	{
		throw err;
	}
	const server = http.createServer((req,res)=>
	{
	res.statusCode = 200;
	res.setHeader('Content-type', 'text/html');
	res.write(html);
	});

	var lien = document.getElementbyId('URL').innerText;

	console.log(lien);
	server.listen(port, hostname, () => {
	console.log('Server started on port', port);
	});
});*/

var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
	if(req.method.toLowerCase()=='get')
	{
		displayForm(res);
	}
	else if (req.method.toLowerCase()=='post') 
	{
		processAllFieldsOfTheForm(req,res);
	}
});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req,res)
{
	var form = new formidable.IncomingForm();

	form.parse(req, function(err,fields,files)
	{
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('received the data : \n \n');
		res.end(util.inspect(
		{
			fields : fields,
			files : files
		}));
	});
}
server.listen(3000);
console.log("server listening on 1185");

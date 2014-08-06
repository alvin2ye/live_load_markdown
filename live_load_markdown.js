var events = require('events');
var sys = require('sys');
var http = require('http');
var fs = require('fs');
var url = require('url');
var md = require("node-markdown").Markdown;

var LiveLoadMarkdown = function() {
	var _self = this;
	var last_content = null;

	var routes = {
		'/' : function(request, response) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			var string = _self.indexTemplate;
			response.write(string);
			response.end();
		},

		'/get_update' : function(request, response) {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			updateLoop.call(this, request, response);
		}
	}

	var updateLoop = function(request, response) {
		fs.readFile(process.env.FILE, function (err, data) {
				if (err) throw err;
				var res = String(data);
				if(last_content != res) {
					last_content = res;
					response.write(md(res));
					response.end();
					return false;
				}

				setTimeout(function() {
						updateLoop.call(this, request, response);
					}, 1000);
			}
		);
	};

	var _requestHandler = function(request, response) {    
		var pass = false;

		if(!pass && routes[request.url] === undefined) {
			pass = true;
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.write('not found\n');
			response.end();
		}

		if(!pass) {
			routes[request.url].call(this, request, response);
		}
	};

	fs.readFile('./index.html', function (err, data) {
			if (err) throw err;
			_self.indexTemplate = data;
		}
	);

	var _server = http.createServer().
	addListener('request', _requestHandler)
	.listen(8000);
	sys.puts('http://localhost:8000');
};

new LiveLoadMarkdown();

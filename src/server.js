const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('./src/form.html', 'UTF-8').pipe(res);
  } else if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', function () {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(`{"received":"${body}"}`);
    });
  }
}).listen(3000);

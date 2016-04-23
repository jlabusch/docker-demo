// "Hello HTTP" from https://howtonode.org/hello-node
// "Client instance" from https://github.com/brianc/node-postgres


// Load the http module to create an http server.
var http = require('http');

var pg = require('pg');

var conString = "postgres://postgres:@db/postgres";

var greeting = '';

var client = new pg.Client(conString);
client.connect(function load_greeting(err) {
  if(err) {
    console.error('could not connect to postgres', err);
    process.exit(1);
  }
  client.query('SELECT message FROM greetings limit 1', function(err, result) {
    if(err) {
      console.error('error running query', err);
      process.exit(1);
    }
    greeting = result.rows[0].message;
    if (!greeting){
        console.log('No greeting, trying again...');
        setTimeout(load_greeting, 250);
    }
    client.end();
  });
});

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(process.env.HOSTNAME + greeting + "\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running on container " + process.env.HOSTNAME);


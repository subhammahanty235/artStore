const http = require('http');
const startConsumer = require('./startMQConsumer');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

// Listen on port 3000
const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setTimeout(() => {
    console.log("Starting RabbitMQ consumer after delay...");
    startConsumer();
}, 20000);
  // startConsumer()
});

const http = require('http');
const app = require('./app');

<<<<<<< HEAD
const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port);
console.log('server is running on 5000')
=======
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
>>>>>>> ecbb139c7fb38fcbfbc6c36e4845dc5f143fafe7

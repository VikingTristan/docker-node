'use strict';

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Socket connections
var connections = 0;

// App
app.get('/', (req, res) => {
  console.log("Request was made...");
  res.sendFile(`${__dirname}/index.html`)
});

http.listen(PORT, HOST, ()=> {
  console.log(`Running on http://${HOST}:${PORT}`);
});

// Setting up socket
io.on("connection", socket => {
  console.log("User connected...⚽");
  
  // Add connection to total connections to mongodb
  // Then emit
  io.emit("connections", connections);
  socket.on('disconnect', function () {
    console.log("User disconnected...🔐");
    // Remove connection from mongodb
  });
});
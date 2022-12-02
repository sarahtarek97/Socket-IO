const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("new socker connection");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("new message", (msg) => {
    console.log("this is new message", msg);
    io.emit("incoming", msg);
  });
});
server.listen(3000, () => {
  console.log("Server is listening on server 300!");
});

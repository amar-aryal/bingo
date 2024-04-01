// TODO: try to implement making a separate room for game in web sockets (in this or make new project if decide to deploy)
// TODO: new project - Bingo game (DONE)
// TODO: socket io in node js - different rooms
// TODO: Html css js frontend, if time to learn, use React or Vue
// TODO: think more features
// TODO: deploy in render or fly.io

const gameEventsHandler = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    //
    var numbersCrossed = [];
    var connectedUsers = [];
    //
    console.log("CONNECTED");
    socket.on("CreateNewRoom", (room) => {
      // creating new room
      // the user who creates the room by default joins the room

      try {
        socket.join(room);
        connectedUsers.push(socket.id);
        console.log(`Room: ${room}`);
        console.log(socket.rooms);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("JoinRoom", (room) => {
      // assuming the socket.id as a unique user identifier, after joining room, the user is added to the room
      // NOTE: socket.id is automatically assigned to each new connected client
      socket.join(room);
      connectedUsers.push(socket.id);
      console.log(connectedUsers);
    });

    socket.on("LeaveRoom", (room) => {
      socket.leave(room);
      connectedUsers.splice(connectedUsers.indexOf(user), 1);
      console.log(connectedUsers);
    });

    socket.on("GenerateNumber", () => {
      const number = Math.floor(Math.random(1, 75));
      socket.emit(GenerateNextNumber, number);
    });

    socket.on("Disconnect", () => {
      socket.disconnect();
      console.log(`${socket.id} disconnected`);
    });
  });
};

module.exports = gameEventsHandler;

// TODO: Html css js frontend, if time to learn, use React or Vue
// TODO: think more features
// TODO: deploy in render or fly.io

// TODO: error handling
// TODO: plan about disconnection events and how to handle different conditions
// TODO: add chat feature if possible
const gameEventsHandler = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    // stores the numbers which are already crossed for the game session
    var numbersCrossed = [];
    // stores the users joined in the current room session
    var connectedUsers = [];
    //
    console.log("CONNECTED");
    socket.on("JoinRoom", (room, userToken) => {
      // creating new room
      // the user who creates the room by default joins the room

      try {
        socket.join(room);
        connectedUsers.push(userToken);

        // send the users list everytime someone new joins. For updating UI
        socket.to(room).emit(connectedUsers);

        console.log(socket.rooms);
        console.log(connectedUsers);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("LeaveRoom", (room, userToken) => {
      socket.leave(room);
      connectedUsers.splice(connectedUsers.indexOf(userToken), 1);
      console.log(connectedUsers);
    });

    socket.on("GenerateNumber", (room) => {
      // this callback will be performed only for specified room
      const number = Math.floor(Math.random(1, 75));
      socket.to(room).emit(GenerateNextNumber, number);
    });

    // while joining room, checking if the given room exists
    socket.on("CheckRoom", (room) => {
      const roomExists = io.sockets.adapter.rooms.has(room);
      console.log(`${room} ${roomExists}`);

      socket.emit("RoomExists", { room, roomExists });
    });

    socket.on("Disconnect", (userToken) => {
      connectedUsers.splice(connectedUsers.indexOf(userToken), 1);
      socket.disconnect();
      console.log(`${userToken} disconnected`);
    });
  });
};

module.exports = gameEventsHandler;

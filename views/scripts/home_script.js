var socket = io();

// for directly creating room
var createRoom = document.getElementById("create-room");

createRoom.addEventListener("click", () => {
  checkAndJoinRoom(true);
  // window.location.replace("bingo.html");
});

// for joining existing room
var joinRoomDialog = document.getElementById("join-room-dialog");
var roomInfoDialog = document.getElementById("room-info-dialog");
var closeDialogBtn = document.getElementById("close-dialog");
var joinRoom = document.getElementById("join-room");
var roomNameInput = document.getElementById("room-name");
var inputErrorMsg = document.getElementById("input-error-msg");

joinRoomDialog.addEventListener("click", () => {
  roomInfoDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  roomInfoDialog.close();
});

joinRoom.addEventListener("click", () => {
  if (!roomNameInput.value || roomNameInput.value == "") {
    inputErrorMsg.innerText = "Room name is empty!";
    return;
  } else {
    // socket.emit("CheckRoom", roomName);

    // socket.on("RoomExists", (data) => {
    //   console.log(`Room ${data.room} exists: ${data.roomExists}`);

    //   if (data.roomExists) {
    //     inputErrorMsg.innerText = "";

    //     // set the user session token and then join the room
    //     setUserSessionToken();
    //     const userToken = getUserSessionToken();
    //     socket.emit("JoinRoom", data.room, userToken);
    //   } else {
    //     inputErrorMsg.innerText = "Room does not exist!";
    //   }
    // });
    checkAndJoinRoom(false);
  }
});

// room check logic
/**
 * this method is called when creating and joining room both.
 * if creating:
 * - generates a unique name and checks if the name already exists
 * - if name exists, then generate the name again until unique name found
 * - else create and join the new room
 *
 * if joining existing room:
 * - check if the given room exists or not
 * - if exists, then join room
 * - else give error message
 */
function checkAndJoinRoom(forCreateRoom) {
  var roomName = roomNameInput.value;

  socket.emit("CheckRoom", roomName);

  socket.on("RoomExists", (data) => {
    console.log(`Room ${data.room} exists: ${data.roomExists}`);

    try {
      // set and obtain the user session token
      setUserSessionToken();
      const userToken = getUserSessionToken();

      // the if block logic is for create room functionality
      if (forCreateRoom) {
        if (data.roomExists) {
          // checkAndJoinRoom(true);
        } else {
          // generate a room name
          const roomName = `Room${Math.floor(Math.random() * 10000)}`;
          // join the room
          socket.emit("JoinRoom", roomName, userToken);

          console.log(`Room created: ${roomName}`);
        }
      } else {
        // the else block logic is for join room functionality
        if (data.roomExists) {
          inputErrorMsg.innerText = "";

          socket.emit("JoinRoom", data.room, userToken);
        } else {
          inputErrorMsg.innerText = "Room does not exist!";
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// session storage manipulation
function setUserSessionToken() {
  // setting the socket id as a unique user token
  try {
    sessionStorage.setItem("userToken", socket.id);
    console.log(`Token saved: ${socket.id}`);
  } catch (error) {
    console.log(error);
  }
}

function getUserSessionToken() {
  try {
    const userToken = sessionStorage.getItem("userToken");
    console.log(`Token retrieved: ${userToken}`);
    return userToken;
  } catch (error) {
    console.log(error);
    return error;
  }
}

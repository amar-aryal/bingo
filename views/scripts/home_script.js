var socket = io("http://localhost:5000");

// for directly creating room
var createRoom = document.getElementById("create-room");

function createNewRoom() {
  const roomName = `Room${Math.floor(Math.random() * 10000)}`;
  socket.emit("CheckRoom", roomName, true);
}

createRoom.addEventListener("click", () => {
  createNewRoom();
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
  inputErrorMsg.innerText = "";
  roomNameInput.value = "";
});

joinRoom.addEventListener("click", () => {
  if (!roomNameInput.value || roomNameInput.value == "") {
    inputErrorMsg.innerText = "Room name is empty!";
    return;
  } else {
    var roomName = roomNameInput.value;
    socket.emit("CheckRoom", roomName, false);
  }
});

/**
 * this callback method is called when creating and joining room both.
 * if creating:
 * - checks if the name already exists
 * - if name exists, then generate the name again until unique name found
 * - else create and join the new room
 *
 * if joining existing room:
 * - check if the given room exists or not
 * - if exists, then join room
 * - else give error message
 */

socket.on("RoomExists", (data) => {
  console.log(`Room ${data.room} exists: ${data.roomExists}`);

  try {
    // set and obtain the user session token
    setUserSessionToken();
    const userToken = getUserSessionToken();

    // the if block logic is for create room functionality
    if (data.forCreateRoom) {
      if (data.roomExists) {
        createNewRoom();
      } else {
        // join the room
        socket.emit("JoinRoom", data.room, userToken);

        console.log(`Room created: ${data.room}`);

        setCurrentRoomName(data.room);

        goToBingoPage();
      }
    } else {
      // the else block logic is for join room functionality
      if (data.roomExists) {
        inputErrorMsg.innerText = "";

        socket.emit("JoinRoom", data.room, userToken);

        console.log(`Room joined: ${data.room}`);

        setCurrentRoomName(data.room);

        goToBingoPage();
      } else {
        inputErrorMsg.innerText = "Room does not exist!";
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// go to new window
function goToBingoPage() {
  setTimeout(() => {
    window.location.replace("bingo.html");
  }, 3000);
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

function setCurrentRoomName(room) {
  try {
    sessionStorage.setItem("currentRoom", room);
    console.log(`Room saved: ${room}`);
  } catch (error) {
    console.log(error);
  }
}

var socket = io();

// for directly creating room
var createRoom = document.getElementById("create-room");

createRoom.addEventListener("click", () => {
  socket.emit("JoinRoom", "abcd");
  window.location.replace("bingo.html");
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
    inputErrorMsg.innerText = "";
    var roomName = roomNameInput.value;
  }
});

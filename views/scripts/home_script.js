var socket = io();

var createRoom = document.getElementById("create-room");
var joinRoomDialog = document.getElementById("join-room-dialog");
var roomInfoDialog = document.getElementById("room-info-dialog");
var closeDialogBtn = document.getElementById("close-dialog");

createRoom.addEventListener("click", () => {
  socket.emit("JoinRoom", "abcd");
  window.location.replace("bingo.html");
});

joinRoomDialog.addEventListener("click", () => {
  roomInfoDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  roomInfoDialog.close();
});

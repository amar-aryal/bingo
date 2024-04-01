var socket = io();

var createRoom = document.getElementById("createRoom");
var joinRoom = document.getElementById("joinRoom");
var roomInfoDialog = document.getElementById("room-info-dialog");
var closeDialogBtn = document.getElementById("close-dialog");

createRoom.addEventListener("click", () => {
  socket.emit("JoinRoom", "abcd");
  window.location.replace("bingo.html");
});

joinRoom.addEventListener("click", () => {
  roomInfoDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  roomInfoDialog.close();
});

// var socket =
socket.emit("JoinRoom", "abcd");

// Function to generate random numbers between 1 and 75
function generateRandomNumber() {
  return Math.floor(Math.random() * 75) + 1;
}

// Generate 25 unique random numbers
var numbers = [];
while (numbers.length < 25) {
  var randomNumber = generateRandomNumber();
  if (!numbers.includes(randomNumber)) {
    numbers.push(randomNumber);
  }
}

// Shuffle the numbers array
numbers.sort(function () {
  return 0.5 - Math.random();
});

// Generate HTML for bingo boxes
var bingoGrid = document.getElementById("bingo-grid");
for (var i = 0; i < 25; i++) {
  if (i % 5 === 0) {
    var row = document.createElement("div");
    row.className = "row";
    bingoGrid.appendChild(row);
  }
  var box = document.createElement("div");
  box.className = "box";
  box.textContent = numbers[i];
  bingoGrid.lastChild.appendChild(box);
}

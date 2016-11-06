var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var chosenColor = chooseColor(colors);
var respo = document.getElementById("response");
var resetButton = document.querySelector("#reset");
var colorName = document.getElementById("color-name");
var modeButtons = document.querySelectorAll(".mode");
var buttonEasy = document.getElementById("easy-btn");
var buttonHard = document.getElementById("hard-btn");
var modeButtons = document.querySelectorAll(".mode");
var buttonHelp = document.getElementById("help-btn");
var helpMessage = document.getElementById("help-msg");

init();


//Set up the page
function init() {
    resetButton.addEventListener("click", resetColors);
    colorName.textContent = chosenColor;

    configModeButtons();
    configHelp();
    configSquares();
    resetColors();
}


//Return a random value between 0 and 255, inclusive
function randomColorValue () {
  return Math.floor(Math.random() * 256);
}

//Return an array of strings, each of which is a random RGB color
function generateRandomColors (len) {
  var c = new Array();
  for (var i = 0; i < len; i++) {
    var r = randomColorValue();
    var g = randomColorValue();
    var b = randomColorValue();
    c.push("rgb(" + r + ", " + g + ", " + b + ")");
  }
  return c;
}

//Return an item from array l, chosen at random
function chooseColor (l) {
  var idx = Math.floor(Math.random() * l.length);
  return l[idx];
}

//Reset colors of headings and squares
function resetColors() {
    resetButton.textContent = "New colors";
    colors = generateRandomColors(numSquares);
    chosenColor = chooseColor(colors);
    colorName.textContent = chosenColor;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        colorName.style.background = "steelblue";
        document.querySelector("h1").style.background = "steelblue";
        respo.textContent = "";
    }
}

//Change colors of all squares and main headings to color
function changeColorsOnWin (color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
  document.getElementById("color-name").style.background = color;
  document.querySelector("h1").style.background = color;
};

//Setup help button to display help message when pressed
function configHelp() {
    buttonHelp.addEventListener("click", function() {
        if (helpMessage.style.display === 'block') {
            helpMessage.style.display = 'none';
        } else {
            helpMessage.style.display = 'block';
        }
    });
}

//Add event listeners to mode buttons
function configModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            resetColors();
        });
    }
}

//Set up squares with colors and event listeners
function configSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].addEventListener("click", function () {
            if (this.style.background === chosenColor) {
                resetButton.textContent = "Play again";
                respo.textContent = "You win!";
                changeColorsOnWin(this.style.background);
            } else {
                this.style.background = "#232323";
                respo.textContent = "Try again";
            }
        });
    }
}

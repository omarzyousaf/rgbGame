var numSquares = 6;
var colors = [];
var pickedColor;
//selectors
var h1 = document.querySelector('h1');
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

//this function runs at the beginning and runs all the initial code to set up mode button listeners and square listeners; then run reset() whihc picks colors
init();

//this is to clean things up! put long code into functions and call them at the beginning.
function init() {
	//Mode Button eventListeners
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			//removing selected from both buttons just to be safe, ok to hard code since only two buttons
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			//ternary operatior; if = Easy, then : otherwise
			this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);
			reset();
		});
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener('click', function() {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				resetButton.textContent = 'Play Again?';
				changeColors(clickedColor); //this is the function from below!
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again';
			}
		});
	}
}

function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	//we can use "THIS" because we're inside the addEventListener of resetButton
	resetButton.textContent = 'New Colors';
	messageDisplay.textContent = '';
	//change color of squares on the page, looping through and changing colors
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}
	//change header to blank
	h1.style.backgroundColor = 'steelblue';
}

//RESET BUTTON
resetButton.addEventListener('click', function() {
	reset();
});

function changeColors(color) {
	//loop through all the squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		//change each color to match given color
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length); //picks a random number between 0 and 1; floor removes the decimal; multiplies random by length of array
	return colors[random]; //pick a random color from our array of colors
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor()); //push/add to the array!
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);

	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

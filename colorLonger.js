var numSquares = 6;
var colors = generateRandomColors(numSquares);
var h1 = document.querySelector('h1');
var squares = document.querySelectorAll('.square');
var pickedColor = pickColor(); //pick a random color
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

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

//THIS BELOW IS REFACTORED INTO THE RESET FUNCTION AND CLASSES TOGETHER!
// //Easy Button
// easyBtn.addEventListener('click', function() {
// 	hardBtn.classList.remove('selected');
// 	easyBtn.classList.add('selected');
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		if (colors[i]) {
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = 'none';
// 		}
// 	}
// });

// hardBtn.addEventListener('click', function() {
// 	hardBtn.classList.add('selected');
// 	easyBtn.classList.remove('selected');
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = 'block';
// 	}
// });

// hardBtn.addEventListener('click', function() {
// 	alert('Hard');
// });

//RESET BUTTON
resetButton.addEventListener('click', function() {
	reset();
	//wE CAN JUST USE THE RESET() AND DELETE EVERYTHING BELOW!
	//generate all new colors
	// colors = generateRandomColors(numSquares);
	// //pick a new random color from array
	// pickedColor = pickColor();
	// //change colorDisplay to match picked Color
	// colorDisplay.textContent = pickedColor;
	// //we can use "THIS" because we're inside the addEventListener of resetButton
	// this.textContent = 'New Colors';
	// messageDisplay.textContent = '';
	// //change color of squares on the page
	// for (var i = 0; i < squares.length; i++) {
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// //change header to blank
	// h1.style.backgroundColor = 'steelblue';
});

colorDisplay.textContent = pickedColor;

//style.background doesn't work in FireFox. style.backgroundColor works in all browsers!
for (var i = 0; i < squares.length; i++) {
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
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

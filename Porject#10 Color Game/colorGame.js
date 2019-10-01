var squares = document.getElementsByClassName("square");
var reset = document.getElementById("reset");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var easyMode = 3;
var hardMode = 6;
var numSquares;
var colorsArr = [];
var pickedColor;

init(hardMode);

function init(mode) {
	setupDisplay(mode);
	setupSquares(mode);
}

function randomNum(min, max) {
	var number = Math.floor(Math.random() * max + 1) + min; 
	return number
}

function randomColor() {
	var colorString = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
	return colorString;
}

function createColorsArr(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function changeColors(num) {
	for (var i = 0; i < num; i++) {
		squares[i].style.backgroundColor = pickedColor;
	}
	document.querySelector("h1").style.backgroundColor = pickedColor;
} 

function setupDisplay(mode) {
	document.querySelector("h1").style.backgroundColor = "steelblue";
	numSquares = mode;
	document.getElementById("display").textContent = "";
	reset.textContent = "New Colors"
	if (mode === easyMode) {
		for (var i = (hardMode - 1); i > (easyMode - 1); i--) {
			squares[i].style.display = "none";
		}
	} else {
		for (var i = 0; i < mode; i++) {
			squares[i].style.display = "block"
		}
	}	
}

function setupSquares(mode) {
	colorsArr = createColorsArr(mode);
	pickedColor = colorsArr[randomNum(0, (mode - 1))];
	document.querySelector("span").textContent = pickedColor;
	for (var i = 0; i < mode; i++) {
		squares[i].style.backgroundColor = colorsArr[i];
		squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === pickedColor) {
				document.getElementById("display").textContent = "Correct!"
				changeColors(mode);
				reset.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323"
				document.getElementById("display").textContent = "Try Again!";
			   }	
		});
	}	
} 

reset.addEventListener("click", function() {
	numSquares === easyMode ? init(easyMode): init(hardMode);
});

easy.addEventListener("click", function() {
	hard.classList.remove("selected");
	easy.classList.add("selected");
	init(easyMode);
})

hard.addEventListener("click", function() {
	easy.classList.remove("selected");
	hard.classList.add("selected");
	init(hardMode);
})

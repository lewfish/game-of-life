//GUI for the Game of Life
//see gol.js for the simulation code and a text-based test

"use strict";

var grid = document.getElementById("grid-canvas")
var gridCtx = grid.getContext("2d");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var resetButton = document.getElementById("reset-button");

var nRows = 40;
var nCols = 80;
var gol = new GameOfLife(nRows, nCols);
gol.setRand();

var cellWidth = grid.width / nCols;
var cellHeight = grid.height / nRows;
//draws a black and white grid based on the state of the GOL object
function drawGrid() {
    for(var i = 0; i < nRows; i++) {
	for(var j = 0; j < nCols; j++) {
	    if(gol.getCell(i, j) == 1)
		gridCtx.fillStyle = "white";
	    else
		gridCtx.fillStyle = "black";
	    gridCtx.fillRect(j * cellWidth + 1, i * cellHeight + 1, cellWidth - 2, cellHeight - 2);
	}
    }
    //console.log(gol.toString());
}

drawGrid();

var doAnimate = false;
var fps = 3.0;
function animate() {
    if(doAnimate) {
	drawGrid();
	gol.step();
	setTimeout(animate, 1000.0 / fps);
    }
}

function start() {
    doAnimate = true;
    animate();
}
startButton.addEventListener("click", start)

function stop() {
    doAnimate = false;
}
stopButton.addEventListener("click", stop)

function reset() {
    gol.setRand();
    drawGrid();
}
resetButton.addEventListener("click", reset);

//simulation code for The Game of Life
//http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
//the grid is a 2d array, where cells are either alive or dead.
//at each time step, the state of each cell is updated according 
//to a simple function of the state of the neighbors.

"use strict";

//make a 2d array
//adapted from Douglas Crockford (JavaScript: The Good Parts, p.64)
//via http://www.stephanimoroni.com/how-to-create-a-2d-array-in-javascript/
Array.matrix = function(nRows, nCols, initVal) {
    var m = [];
    for(var i = 0; i < nRows; i++) {
	var row = [];
	for(var j = 0; j < nCols; j++) {
	    row[j] = initVal;
	}
	m[i] = row;
    }
    return m;
}

///constructor for GameOfLife class
function GameOfLife(nRows, nCols) {
    this.nRows = nRows;
    this.nCols = nCols;
    //add padding on all four edges of grid
    //a cell that is dead is represented by 0, and 1 otherwise
    this.grid = Array.matrix(this.nRows + 2, this.nCols + 2, 0);
}
GameOfLife.prototype.setCell = function(i, j, val) {
    this.grid[i+1][j+1] = val;
}
GameOfLife.prototype.getCell = function(i, j) {
    return this.grid[i+1][j+1];
}
//randomly set cell to  be live (sample from a bernoulli with p=0.5)
GameOfLife.prototype.setRand = function() {
    for(var i = 0; i < this.nRows; i++) {
	for(var j = 0; j < this.nCols; j++) {
	    this.setCell(i, j, Math.random() > 0.5 ? 0 : 1);
	}
    }    
}
//string rep of the state of the grid
//where alive is represented by "x" and dead by " "
GameOfLife.prototype.toString = function() {
    var s = "";
    
    function makeLine(n) {
	var s = " ";
	for(var j = 0; j < n; j++) {
	    s += "_";
	}
	s += "\n";
	return s;
    }
    
    s += makeLine(this.nCols);
    for(var i = 0; i < this.nRows; i++) {
	s += "|";
	for(var j = 0; j < this.nCols; j++) {
	    s += this.getCell(i, j) == 1 ? "x" : " ";
	}
	s += "|\n";
    }
    s += makeLine(this.nCols);

    return s;
}
//advance the simulation one step
//update the state of each cell synchronously
GameOfLife.prototype.step = function() {
    var newGrid = Array.matrix(this.nRows + 2, this.nCols + 2, 0);
    var nLiveNei = 0;
    for(var i = 1; i <= this.nRows; i++) {
	for(var j = 1; j <= this.nCols; j++) {
	    //default is to stay in the same state
	    newGrid[i][j] = this.grid[i][j];

	    //count number of live neighbors
	    nLiveNei = this.grid[i-1][j-1] + this.grid[i-1][j] + this.grid[i-1][j+1];
	    nLiveNei += this.grid[i][j-1] + this.grid[i][j+1];
	    nLiveNei += this.grid[i+1][j-1] + this.grid[i+1][j] + this.grid[i+1][j+1];
	    
	    //if alive and overcrowded or isolated, then dies
	    if(this.grid[i][j] == 1 && (nLiveNei < 2 || nLiveNei > 3)) {
		newGrid[i][j] = 0;
	    }

	    //if dead with 3 live neighbors, the becomes alive
	    if(this.grid[i][j] == 0 && nLiveNei == 3) {
		newGrid[i][j] = 1;
	    }
	}
    }
    this.grid = newGrid;
}

function tests() {
    var m = Array.matrix(2, 2, 0);
    console.log(m);

    var nRows = 3;
    var nCols = 3;
    var gol = new GameOfLife(nRows, nCols);
    console.log(gol.toString());

    gol.setRand();
    console.log(gol.toString());

    //test with "blinker" pattern
    gol = new GameOfLife(nRows, nCols);

    //set vertical bar
    gol.setCell(0, 1, 1);
    gol.setCell(1, 1, 1);
    gol.setCell(2, 1, 1);

    //should cycle between vertical and horizontal bar
    var nSteps = 4;
    for(var t = 0; t < nSteps; t++) {
	console.log("blinker at t = " + t);
	console.log(gol.toString());
	gol.step();
    }
}

//tests();

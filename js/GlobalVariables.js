//main grid elements
var GRID;
var START_NODE;
var END_NODE;

//variables for canvas and drawing
var canvas;
var buffer;
var context;
var drawGrid;
var developerMode;
var placeStartNode;
var placeEndNode;

/*
STATE possible (string) values:
draw: can draw on canvas
visualize: visualizing algorithm
finish: finished visualizing algorithm and can clear canvas
*/
var STATE;

//change this to edit the speed at which animations play
const ANIMATION_DELAY = 15;

//change these to alter the size of the grid
const ROWS = 16;
const COLS = 30;
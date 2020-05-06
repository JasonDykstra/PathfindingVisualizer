(function () {
    //local variables for drawing
    var size, createStartNode, createEndNode, eraser, nodeColors, lastCellHovered, mouseOverCanvas;

    //define canvas elements
    buffer = document.createElement("canvas").getContext("2d");
    context = document.querySelector("canvas").getContext("2d");
    canvas = document.querySelector("canvas");

    //define other elements
    GRID = [];
    eraser = false;
    nodeColors = [];
    createStartNode = false;
    createEndNode = false;
    developerMode = false;

    //initialize stuff
    initialize = function () {
        //initialize the grid of empty nodes
        for (let i = 0; i < ROWS; ++i) {
            var row = [];
            for (let j = 0; j < COLS; ++j) {
                var tempNode = new Node(i, j);
                row.push(tempNode);
            }
            GRID.push(row);
        }

        size = 32;

        mouseOverCanvas = false;

        buffer.canvas.width = COLS * size;
        buffer.canvas.height = ROWS * size;
        buffer.strokeStyle = "#bbbbbb";

        nodeColors["empty"] = "#ffffff";
        nodeColors["start"] = "#00ff00";
        nodeColors["end"] = "#ff0000";
        nodeColors["wall"] = "#000000";
        nodeColors["visited"] = "#0000ff";
        nodeColors["shortestPath"] = "#00ffff";

        lastCellHovered = [0, 0];

        STATE = "draw";
        console.log("initialization complete...");
    }

    initialize();


    //functions

    //returns absolute position of cursor
    function getCursorPos() {
        var pos = [];
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        pos.push(x);
        pos.push(y);
        return pos;
    }

    //even though I check to see if the cursor is in the canvas, there is still a frame where
    //it returns a cell outside of the canvas, so have to account for that using this function
    function posInCanvas(gridPos) {
        if (
            gridPos[0] < 0 ||
            gridPos[0] >= GRID.length ||
            gridPos[1] < 0 ||
            gridPos[1] >= GRID[0].length
        )
            return false;
        return true;
    }

    function updateLastCellHovered() {
        var pos = getCursorPos();
        var gridPos = getGridPos(pos[0], pos[1]);
        
        //could use the mouseOverCanvas variable, but this works more consistently
        if (posInCanvas(gridPos)) {

            //if cursor moves to a different grid space
            if (gridPos[0] != lastCellHovered[0] | gridPos[1] != lastCellHovered[1]) {
                drawHoverCells(gridPos);
            }
        }
    }

    function drawHoverCells(gridPos) {
        var fillStyle = "";
        var row = gridPos[0];
        var col = gridPos[1];
        var node = GRID[lastCellHovered[0]][lastCellHovered[1]];

        //make the previously hovered square whatever color it was before
        fillStyle = nodeColors[getNodeType(node)];
        drawCell(fillStyle, lastCellHovered[0], lastCellHovered[1]);

        //if you're creating a start node
        if (createStartNode) fillStyle = nodeColors["start"];
        if (createEndNode) fillStyle = nodeColors["end"];

        //fill in the new cell with the appropriate color
        drawCell(fillStyle, row, col);

        //draw canvas
        drawCanvas();

        //update lastCellHovered
        lastCellHovered = gridPos;
    }

    //returns a string of the type of a node
    function getNodeType(node) {
        if (node.isStart()) return "start";
        if (node.isEnd()) return "end";
        if (node.isShortestPath()) return "shortestPath";
        if (node.isWall()) return "wall";
        if (node.isVisited()) return "visited";
        return "empty";
    }

    //function to make code a little more easily readable
    function drawCanvas() {
        context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
    }

    //helper function for drawing individual cells
    function drawCell(fillStyle, row, col) {
        buffer.fillStyle = fillStyle;
        buffer.fillRect(col * size, row * size, size, size);
        buffer.strokeRect(col * size, row * size, size, size);
    }

    //main draw function for canvas
    //currently has to be a variable and not a function for it to have global scope
    drawGrid = function () {
        for (let row = 0; row < GRID.length; ++row) {
            for (let col = 0; col < GRID[0].length; ++col) {

                //set the draw variables
                let node = GRID[row][col];
                var fillStyle = nodeColors[getNodeType(node)];

                //draw the node
                drawCell(fillStyle, row, col);

                //draw additional features if in developer mode
                if (developerMode) {
                    //text displaying distances on nodes
                    buffer.fillStyle = "#ffffff";
                    buffer.font = "10px Arial";

                    //center the text vertically and horizontally
                    buffer.textAlign = "center";
                    buffer.textBaseLine = "middle";

                    var width = canvas.width;
                    var height = canvas.height;
                    buffer.fillText(
                        node.getDistance(),
                        node.getCol() * size + size / 2,
                        node.getRow() * size + size / 2
                    );
                    //TODO change the values above to center the text instead of hardcoding it
                }
            }
        }

        drawCanvas();
    };

    //just keeps the canvas element sized appropriately
    function resize(event) {
        context.canvas.width = Math.floor(
            document.documentElement.clientWidth - size
        );

        if (context.canvas.width > document.documentElement.clientHeight) {
            context.canvas.width = Math.floor(
                document.documentElement.clientHeight
            );
        }

        context.canvas.height = Math.floor(
            context.canvas.width * (ROWS / COLS)
        );

        drawGrid();
    }

    //call resize on startup to draw the canvas initially
    resize();

    //IMPORTANT does not return (x, y) coordinates of a node, but rather (row, col), so flipped
    //this is due to the way the 2d array works, and that the first parameter is row and second is col
    function getGridPos(x, y) {
        var width = canvas.width;
        var height = canvas.height;
        var coordinate = [];
        coordinate.push(Math.floor(y / (height / ROWS)));
        coordinate.push(Math.floor(x / (width / COLS)));
        return coordinate;
    }

    function placeNode() {
        if (STATE == "draw") {
            var pos = getCursorPos();
            var gridPos = getGridPos(pos[0], pos[1]);
            var row = gridPos[0];
            var col = gridPos[1];

            //clear the last start node and place new start node
            if (createStartNode) {
                clearGrid("start");
                GRID[row][col].setStart(true);
                GRID[row][col].setWall(false);
                START_NODE = GRID[row][col];
            }

            //place end
            if (createEndNode) {
                clearGrid("end");
                GRID[row][col].setEnd(true);
                GRID[row][col].setWall(false);
                END_NODE = GRID[row][col];
            }

            //place wall

            //don't allow user to make walls to overwrite the start and end nodes
            if (
                GRID[row][col].isStart() == false &&
                GRID[row][col].isEnd() == false
            )
                GRID[row][col].setWall(eraser ? false : true);

            drawGrid();
        }
    }



    //event listeners

    window.addEventListener("resize", resize, { passive: true });

    window.addEventListener("mousedown", function (event) {
        console.log(STATE);
        //if (cursorInCanvas()) {
        if(mouseOverCanvas){
            //draw when you click
            placeNode();
            //also draw when you drag while mouse is pressed
            document.addEventListener("mousemove", placeNode);

            if (createStartNode) {
                stopPlaceStartNode();
            }

            if (createEndNode) {
                stopPlaceEndNode();
            }
        }
    });

    window.addEventListener("mouseup", function (event) {
        //when not pressing down mouse button anymore, stop drawing
        document.removeEventListener("mousemove", placeNode);
    });

    document.getElementById("clearGrid").addEventListener("click", function (event) {
        if(STATE == "draw" || STATE == "finished")
            clearGrid();
    });

    document.getElementById("toggleEraser").addEventListener("click", function (event) {
        toggleEraser();
    });

    document.getElementById("toggleDeveloperMode").addEventListener("click", function (event) {
        toggleDeveloperMode();
    });

    canvas.onmouseover = function(){
        mouseOverCanvas = true;
    }

    canvas.onmouseout = function(){
        mouseOverCanvas = false;
    }

    //event listener functions

    function clearGrid(type) {
        //if type is undefined, clear all nodes
        if (typeof type == "undefined") {
            for (let i = 0; i < GRID.length; ++i) {
                for (let j = 0; j < GRID[0].length; ++j) {
                    GRID[i][j].setStart(false);
                    GRID[i][j].setEnd(false);
                    GRID[i][j].setWall(false);
                    GRID[i][j].setVisited(false);
                    GRID[i][j].setShortestPath(false);
                    GRID[i][j].setDistance(Infinity);
                }
            }
            //if type is defined, clear a specific type of node
        } else {
            for (let i = 0; i < GRID.length; ++i) {
                for (let j = 0; j < GRID[0].length; ++j) {
                    if (type == "start") GRID[i][j].setStart(false);
                    if (type == "end") GRID[i][j].setEnd(false);
                }
            }
        }

        STATE = "draw";
        drawGrid();
    }

    placeStartNode = function () {
        createStartNode = true;
        document.addEventListener("mousemove", updateLastCellHovered);
    }

    function stopPlaceStartNode() {
        createStartNode = false;
        document.removeEventListener("mousemove", updateLastCellHovered);
    }

    placeEndNode = function () {
        createEndNode = true;
        document.addEventListener("mousemove", updateLastCellHovered);
    }

    function stopPlaceEndNode() {
        createEndNode = false;
        document.removeEventListener("mousemove", updateLastCellHovered);
    }

    function toggleEraser() {
        eraser = !eraser;
        document.getElementById("toggleEraser").innerHTML =
            "Push to turn " + (eraser ? "off" : "on") + " eraser";
    }

    function toggleDeveloperMode() {
        developerMode = !developerMode;
        drawGrid();
    }

})();

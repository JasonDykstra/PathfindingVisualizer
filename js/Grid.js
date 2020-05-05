var GRID;
var START_NODE;
var END_NODE;

var canvas, buffer, context, drawGrid, developerMode;

(function () {
    var size, createStartNode, createEndNode, eraser, nodeColors;

    buffer = document.createElement("canvas").getContext("2d");
    context = document.querySelector("canvas").getContext("2d");
    canvas = document.querySelector("canvas");

    GRID = [];

    eraser = false;

    nodeColors = [];
    nodeColors["empty"] = "#ffffff";
    nodeColors["start"] = "#00ff00";
    nodeColors["end"] = "#ff0000";
    nodeColors["wall"] = "#000000";
    nodeColors["visited"] = "#0000ff";
    nodeColors["shortestPath"] = "#00ffff";

    createStartNode = false;
    createEndNode = false;
    developerMode = false;

    //change these to alter the size of the grid
    const ROWS = 10;
    const COLS = 20;

    //initialize the grid of empty nodes
    for (let i = 0; i < COLS; ++i) {
        var row = [];
        for (let j = 0; j < ROWS; ++j) {
            var tempNode = new Node(i, j);
            row.push(tempNode);
        }
        GRID.push(row);
    }

    size = 32;

    buffer.canvas.width = COLS * size;
    buffer.canvas.height = ROWS * size;

    function getCursorPos() {
        var pos = [];
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        pos.push(x);
        pos.push(y);
        return pos;
    }

    function cursorInCanvas() {
        var pos = getCursorPos();
        if (
            pos[0] < 0 ||
            pos[0] > canvas.width ||
            pos[1] < 0 ||
            pos[1] > canvas.height
        )
            return false;
        return true;
    }

    drawGrid = function () {
        for (let i = 0; i < GRID.length; ++i) {
            for (let j = 0; j < GRID[0].length; ++j) {
                
                //set the draw variables
                let node = GRID[i][j];
                var fillStyle = nodeColors["empty"];
                if (node.isWall()) fillStyle = nodeColors["wall"];
                if (node.isVisited()) fillStyle = nodeColors["visited"];
                if (node.isShortestPath()) fillStyle = nodeColors["shortestPath"];
                if (node.isStart()) fillStyle = nodeColors["start"];
                if (node.isEnd()) fillStyle = nodeColors["end"];

                //draw the nodes
                buffer.fillStyle = fillStyle;
                buffer.fillRect(i * size, j * size, size, size);
                buffer.strokeStyle = "#bbbbbb";
                buffer.strokeRect(i * size, j * size, size, size);

                //draw additional features if in developer mode
                if (developerMode) {
                    //text displaying distances on nodes
                    buffer.fillStyle = "#ffffff";
                    buffer.font = "10px Arial";

                    var width = canvas.width;
                    var height = canvas.height;
                    buffer.fillText(
                        node.getDistance(),
                        node.getX() * 32 + 10,
                        node.getY() * 32 + 20
                    );
                    //TODO change the values above to center the text instead of hardcoding it
                }
            }
        }

        //while creating the start node, make every node you hover over green
        if (createStartNode) {
            console.log("Hovering green!");
            var pos = getCursorPos;
            var gridPos = getGridPos(pos[0], pos[1]);
            buffer.fillStyle = nodeColors["start"];
            buffer.fillRect(gridPos[0] * size, gridPos[1] * size, size, size);
        }

        context.drawImage(
            buffer.canvas,
            0,
            0,
            buffer.canvas.width,
            buffer.canvas.height,
            0,
            0,
            context.canvas.width,
            context.canvas.height
        );
    };

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

        drawGrid();
    }

    function placeStartNode() {
        createStartNode = true;
        document.addEventListener("mousemove", drawGrid);
    }

    function stopPlaceStartNode() {
        createStartNode = false;
        document.removeEventListener("movemouse", drawGrid);
    }

    function placeEndNode() {
        createEndNode = true;
        document.addEventListener("mousemove", drawGrid);
    }

    function stopPlaceEndNode() {
        createEndNode = false;
        document.removeEventListener("mousemove", drawGrid);
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

    //just keeps the canvas element sized appropriately
    resize = function (event) {
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
    };

    window.addEventListener("resize", resize, { passive: true });

    resize();

    function getGridPos(x, y) {
        var width = canvas.width;
        var height = canvas.height;
        var coordinate = [];
        coordinate.push(Math.floor(x / (width / COLS)));
        coordinate.push(Math.floor(y / (height / ROWS)));
        return coordinate;
    }

    function placeNode() {
        var pos = getCursorPos();
        var gridPos = getGridPos(pos[0], pos[1]);

        //clear the last start node and place new start node
        if (createStartNode) {
            clearGrid("start");
            GRID[gridPos[0]][gridPos[1]].setStart(true);
            GRID[gridPos[0]][gridPos[1]].setWall(false);
            START_NODE = GRID[gridPos[0]][gridPos[1]];
        }

        //place end
        if (createEndNode) {
            clearGrid("end");
            GRID[gridPos[0]][gridPos[1]].setEnd(true);
            GRID[gridPos[0]][gridPos[1]].setWall(false);
            END_NODE = GRID[gridPos[0]][gridPos[1]];
        }

        //place wall

        //don't allow user to make walls to overwrite the start and end nodes
        if (
            GRID[gridPos[0]][gridPos[1]].isStart() == false &&
            GRID[gridPos[0]][gridPos[1]].isEnd() == false
        )
            GRID[gridPos[0]][gridPos[1]].setWall(eraser ? false : true);

        drawGrid();
    }

    document
        .getElementById("placeStartNode")
        .addEventListener("click", function (event) {
            placeStartNode();
        });

    document
        .getElementById("placeEndNode")
        .addEventListener("click", function (event) {
            placeEndNode();
        });

    document
        .getElementById("clearGrid")
        .addEventListener("click", function (event) {
            clearGrid();
        });

    document
        .getElementById("toggleEraser")
        .addEventListener("click", function (event) {
            toggleEraser();
        });

    document
        .getElementById("toggleDeveloperMode")
        .addEventListener("click", function (event) {
            toggleDeveloperMode();
        });

    window.addEventListener("mousedown", function (event) {
        if (cursorInCanvas()) {
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
})();

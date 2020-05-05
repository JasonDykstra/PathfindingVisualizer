(function () {
    var canvas,
        buffer,
        context,
        drawGrid,
        grid,
        size,
        createStartNode,
        createEndNode,
        eraser,
        nodeColors;

    buffer = document.createElement("canvas").getContext("2d");
    context = document.querySelector("canvas").getContext("2d");
    canvas = document.querySelector("canvas");

    grid = [];

    eraser = false;

    nodeColors = [];
    nodeColors["empty"] = "#ffffff";
    nodeColors["start"] = "#00ff00";
    nodeColors["end"] = "#ff0000";
    nodeColors["wall"] = "#000000";

    createStartNode = false;
    createEndNode = false;

    //change these to alter the size of the grid
    const ROWS = 9;
    const COLS = 16;

    //initialize the grid of empty nodes
    for (let i = 0; i < COLS; ++i) {
        var row = [];
        for (let j = 0; j < ROWS; ++j) {
            var tempNode = new Node(i, j);
            row.push(tempNode);
        }
        grid.push(row);
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
        for (let i = 0; i < grid.length; ++i) {
            for (let j = 0; j < grid[0].length; ++j) {
                let node = grid[i][j];

                //var node = grid[0][0];
                var fillStyle = nodeColors["empty"];
                if (node.isStart()) fillStyle = nodeColors["start"];
                if (node.isEnd()) fillStyle = nodeColors["end"];
                if (node.isWall()) fillStyle = nodeColors["wall"];

                buffer.fillStyle = fillStyle;
                buffer.fillRect(i * size, j * size, size, size);
            }
        }

        //while creating the start node, make every node you hover over green
        if (createStartNode) {
            console.log("Hovering green!");
            var pos = getCursorPos;
            var gridPos = getGridPos(pos[0], pos[1]);
            buffer.fillStyle = "#00ff00";
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
        console.log("clear grid called, type = " + typeof(type));
        
        //if type is undefined, clear all nodes
        if(typeof(type) == "undefined"){
            console.log("clear grid subsection called");
            for (let i = 0; i < grid.length; ++i) {
                for (let j = 0; j < grid[0].length; ++j) {
                    grid[i][j].setStart(false);
                    grid[i][j].setEnd(false);
                    grid[i][j].setWall(false);
                }
            }
            //if type is defined, clear a specific type of node
        } else {
            console.log("type not undefined...");
            for (let i = 0; i < grid.length; ++i) {
                for (let j = 0; j < grid[0].length; ++j) {
                    if (type == "start") grid[i][j].setStart(false);
                    if (type == "end") grid[i][j].setEnd(false);
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

    function placeEndNode(){
        createEndNode = true;
        document.addEventListener("mousemove", drawGrid);
    }

    function stopPlaceEndNode(){
        createEndNode = false;
        document.removeEventListener("mousemove", drawGrid);
    }

    function toggleEraser(){
        eraser = !eraser;
        document.getElementById("toggleEraser").innerHTML = "Push to turn " + (eraser ? "off" : "on") + " eraser";
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
            grid[gridPos[0]][gridPos[1]].setStart(true);
            grid[gridPos[0]][gridPos[1]].setWall(false);
        }

        //place end
        if (createEndNode) {
            clearGrid("end");
            grid[gridPos[0]][gridPos[1]].setEnd(true);
            grid[gridPos[0]][gridPos[1]].setWall(false);
        }

        //place wall

        //don't allow user to make walls to overwrite the start and end nodes
        if (
            grid[gridPos[0]][gridPos[1]].isStart() == false &&
            grid[gridPos[0]][gridPos[1]].isEnd() == false
        )
            grid[gridPos[0]][gridPos[1]].setWall(eraser ? false : true);
        
        drawGrid();
    }

    document.getElementById("placeStartNode").addEventListener("click", function (event) {
        placeStartNode();
    });

    document.getElementById("placeEndNode").addEventListener("click", function (event) {
        placeEndNode();
    });

    document.getElementById("clearGrid").addEventListener("click", function (event) {
        clearGrid();
    });

    document.getElementById("toggleEraser").addEventListener("click", function (event){
        toggleEraser();
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

            if(createEndNode){
                stopPlaceEndNode();
            }
        }
    });

    window.addEventListener("mouseup", function (event) {
        //when not pressing down mouse button anymore, stop drawing
        document.removeEventListener("mousemove", placeNode);
    });
})();

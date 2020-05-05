/*(function () {
    var canvas, buffer, context, drawMap, map, size, drawing;

    buffer = document.createElement("canvas").getContext("2d");
    context = document.querySelector("canvas").getContext("2d");
    canvas = document.querySelector("canvas");

    map = [];
    drawing = false;

    const ROWS = 9;
    const COLS = 16;

    for (let i = 0; i < COLS; ++i) {
        var row = [];
        for (let j = 0; j < ROWS; ++j) {
            row.push(1);
        }
        map.push(row);
    }

    size = 32;

    buffer.canvas.width = COLS * size;
    buffer.canvas.height = ROWS * size;

    drawMap = function () {
        for (let i = 0; i < COLS; ++i) {
            for (let j = 0; j < ROWS; ++j) {
                buffer.fillStyle = map[i][j] == 1 ? "#000000" : "#ffffff";
                buffer.fillRect(i * size, j * size, size, size);
            }
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

        drawMap();
    };

    window.addEventListener("resize", resize, { passive: true });

    resize();

    function convertCursorPositionToGridCoordinate(x, y) {
        var width = canvas.width;
        var height = canvas.height;
        var coordinate = [];
        coordinate.push(Math.floor(x / (width / COLS)));
        coordinate.push(Math.floor(y / (height / ROWS)));
        return coordinate;
    }

    function cursorDraw(){
        console.log("drawing!");
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        var modifiedCoords = convertCursorPositionToGridCoordinate(x, y);
        map[modifiedCoords[0]][modifiedCoords[1]] = 0;
        drawMap();
    }
    
    window.addEventListener("mousedown", function (event) {
        console.log("press down");
        //draw when you click
        cursorDraw();
        //also draw when you drag while mouse is pressed
        document.addEventListener('mousemove', cursorDraw);
    });

    window.addEventListener("mouseup", function (event) {
        console.log("press released");
        //when not pressing down mouse button anymore, stop drawing
        document.removeEventListener('mousemove', cursorDraw);
    });
})();
*/
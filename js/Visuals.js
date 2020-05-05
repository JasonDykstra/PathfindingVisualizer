// (function () {
//     const COLS = 20;
//     const ROWS = 10;
//     const size = 10;

//     //create buffer to fix anti aliasing issues for tile canvas
//     var buffer = document.createElement("canvas").getContext("2d");
//     var context = document.querySelector("canvas").getContext("2d");

//     buffer.canvas.width = COLS * size;
//     buffer.canvas.height = ROWS * size;

//     var map = [];

//     function initialize() {
//         //initialize the 2d array (map)
//         for (var i = 0; i < ROWS; ++i) {
//             var tempArray = [];
//             for (var j = 0; j < COLS; ++j) {
//                 tempArray.push(0);
//             }
//             map.push(tempArray);
//         }
//     }

//     // //print map to see if it works
//     // console.log("printing map...");
//     // for (var i = 0; i < ROWS; ++i) {
//     //     var row = "";
//     //     for (var j = 0; j < COLS; ++j) {
//     //         row += map[i][j] + " ";
//     //     }
//     //     console.log(row);
//     // }

//     // function drawCanvas() {
//     //     if (canvas.getContext) {
//     //         for (var x = 0; x < 500; x += 20) {
//     //             context.moveTo(x, 0);
//     //             context.lineTo(x, 500);
//     //         }

//     //         for (var y = 0; y < 500; y += 20) {
//     //             context.moveTo(0, y);
//     //             context.lineTo(500, y);
//     //         }

//     //         context.strokeStyle = "grey";
//     //         context.stroke();
//     //     }
//     // }

//     // function showCoords(event) {
//     //     var x = event.clientX - 10;
//     //     var y = event.clientY - 10;
//     //     var coords = "X coordinates: " + x + ", Y coordinates: " + y;
//     //     document.getElementById("showCoords").innerHTML = coords;
//     // }

//     var drawMap = function () {
//         for (let i = 0; i < ROWS; ++i) {
//             for (let j = 0; j < COLS; ++i) {
//                 var fillStyle = "";
//                 var type = map[i][j];
//                 if (type == 0) {
//                     fillStyle = "#000000";
//                 } else if (type == 1) {
//                     fillStyle = "#ffffff";
//                 } else if (type == 2) {
//                     fillStyle = "#00ff11";
//                 }
//                 buffer.fillStyle = fillStyle;
//                 buffer.fillRect(i * size, j * size, size, size);
//             }
//         }

//         context.drawImage(
//             buffer.canvas,
//             0,
//             0,
//             buffer.canvas.width,
//             buffer.canvas.height,
//             0,
//             0,
//             context.canvas.width,
//             context.canvas.height
//         );
//     };



//     var resize = function(event) {

//         context.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
    
//         if (context.canvas.width > document.documentElement.clientHeight) {
    
//           context.canvas.width = Math.floor(document.documentElement.clientHeight);
    
//         }
    
//         context.canvas.height = Math.floor(context.canvas.width * 0.5625);
    
//         drawMap();
    
//       };
    
//       window.addEventListener("resize", resize, {passive:true});
    
//       resize();
// })();

// node = new Node(3, 3);
// node2 = new Node(3, 3);
// node.setStart(true);
// var testingIsStart = node.isStart();
// console.log(testingIsStart);

// var equal = NodeisEqual(node, node2);
// //document.getElementById("TestDiv").innerHTML = equal;

// testingOpts = function(x, opts){
//     if(opts.Property){
//         return x*2;
//     }
// }

// console.log(testingOpts(3, {Property: true}));

// arrayList = [];
// arrayList.push(0, 1);
// console.log(arrayList[0]);

// testList = new ArrayList();
// testList.add(1);
// testList.add(2);
// testList.add(3);
// var listValue = testList.get(0);
// console.log("List Value: " + listValue);
// console.log("List length: " + testList.size());
// //takeaway: if you add an item at a specified index that does not exist,
// //the function will create all indices before the specified one as well
// //so if you add a value to index 4 of an empty list, the length will be 5

// //testing removing elements from an array
// testList.remove(2);
// testList.print();

// var testList2 = new ArrayList();
// for(var i = 0; i < 20; ++i){
//     testList2.add(i);
// }
// console.log("Test list 2: ");
// testList2.print();

// for(var i = 0; i < 20; ++i){
//     testList2.remove(0);
// }

// console.log("Test list 2 after remove: ");
// testList2.print();


// //testing quicksort
// var items = [5,3,7,6,2,9];
// var sortedArray = quickSort(items, 0, items.length - 1);
// console.log(sortedArray); //prints [2,3,5,6,7,9]


// console.log(Date.now());

// //testing comparisons
// console.log("class comparison: " + (Node.prototype.isPrototypeOf(node)));



// //testing AStar (here we go...)
// var size = 25;
// var startNode = new Node(0, 0);
// var endNode = new Node(0, 5);
// var pathfinding = new AStar(size, startNode, endNode);
// pathfinding.setDiagonal(true);
// pathfinding.start(startNode, endNode);


// //testing modification of variables passed into functions (copy vs reference)
// function testModifyVariable(x){
//     x = 3;
// }

// var testVariableToModify = 5;
// testModifyVariable(testVariableToModify);
// console.log("Original was 5, variable is now: " + testVariableToModify);
// //takeaway: printed 5 so it makes a copy of the variable, doesn't use reference


//testing timeout stuff
// console.log("start...");
// setTimeout(myTestFunctionLog(), 6000);

// function myTestFunctionLog(){
//     console.log("hello!");
// }
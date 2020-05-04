node = new Node(3, 3);
node2 = new Node(3, 3);

var equal = NodeisEqual(node, node2);
document.getElementById("TestDiv").innerHTML = equal;

testingOpts = function(x, opts){
    if(opts.Property){
        return x*2;
    }
}

console.log(testingOpts(3, {Property: true}));

arrayList = [];
arrayList.push(0, 1);
console.log(arrayList[0]);

testList = new ArrayList();
testList.add(1);
testList.add(2);
testList.add(3);
var listValue = testList.get(0);
console.log("List Value: " + listValue);
console.log("List length: " + testList.size());
//takeaway: if you add an item at a specified index that does not exist,
//the function will create all indices before the specified one as well
//so if you add a value to index 4 of an empty list, the length will be 5

//testing removing elements from an array
testList.remove(2);
testList.print();

//testing quicksort
var items = [5,3,7,6,2,9];
var sortedArray = quickSort(items, 0, items.length - 1);
console.log(sortedArray); //prints [2,3,5,6,7,9]


console.log(Date.now());

//testing comparisons
console.log("class comparison: " + (Node.prototype.isPrototypeOf(node)));
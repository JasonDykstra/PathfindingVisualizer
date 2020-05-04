// class Sort {
//     constructor() {
//         this.lowToHigh = true;
//         this.highToLow = false;
//     }

//bubble sort for data of types int[] and ArrayList<Node>
//No overloading in js, so instead pass in an options variable
//and check what properties it has within the function
function bubbleSort(data, opts) {
    //if the options variable passed in is {IntArray: True}
    if (opts.IntArray) {
        var Switch = -1;
        var temp;

        while (Switch != 0) {
            Switch = 0;

            //by default sort in ascending order
            //only sort in descending order if specified in options
            if (opts.HighToLow) {
                for (var i = 0; i < data.length - 1; ++i) {
                    if (data[i] < data[i + 1]) {
                        temp = data[i];
                        data[i] = data[i + 1];
                        data[i + 1] = temp;
                        Switch = 1;
                    }
                }
                //default aciton
            } else {
                for (var i = 0; i < data.length - 1; ++i) {
                    if (data[i] > data[i + 1]) {
                        temp = data[i];
                        data[i] = data[i + 1];
                        data[i + 1] = temp;
                        Switch = 1;
                    }
                }
            }
        }
        //if the options variable passed in is {NodeList: true}
    } else if (opts.NodeList) {
        var Switch = -1;
        tempNode;

        while (Switch != 0) {
            Switch = 0;

            if (this.lowToHigh) {
                for (var i = 0; i < data.size() - 1; ++i) {
                    if (data.get(i).getFCost() > data.get(i + 1).getFCost()) {
                        tempNode = data.get(i);
                        data.remove(i);
                        data.add(i + 1, data);
                        Switch = 1;
                    }
                }
            } else if (this.highToLow) {
                for (var i = 0; i < data.size() - 1; ++i) {
                    if (data.get(i).getFCost() < data.get(i + 1).getFCost()) {
                        tempNode = data.get(i);
                        data.remove(i);
                        data.add(i + 1, data);
                        Switch = 1;
                    }
                }
            }
        }
    }
}


//quicksort functions
function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}

//}
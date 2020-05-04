class Sort {
    constructor() {
        this.lowToHigh = true;
        this.highToLow = false;
    }

    //bubble sort for data of types int[] and ArrayList<Node>
    //No overloading in js, so instead pass in an options variable
    //and check what properties it has within the function
    bubbleSort(data, opts) {
        //if the options variable passed in is {IntArray: True}
        if (opts.IntArray) {
            var Switch = -1;
            var temp;

            while (Switch != 0) {
                Switch = 0;

                if (this.lowToHigh) {
                    for (var i = 0; i < data.length - 1; ++i) {
                        if (data[i] > data[i + 1]) {
                            temp = data[i];
                            data[i] = data[i + 1];
                            data[i + 1] = temp;
                            Switch = 1;
                        }
                    }
                } else if (this.highToLow) {
                    for (var i = 0; i < data.length - 1; ++i) {
                        if (data[i] < data[i + 1]) {
                            temp = data[i];
                            data[i] = data[i + 1];
                            data[i + 1] = temp;
                            Switch = 1;
                        }
                    }
                }
            }
        //if the options variable passed in is {NodeList: true}
        } else if(opts.NodeList){
            var Switch = -1;
            tempNode;

            while(Switch != 0){
                Switch = 0;

                if(this.lowToHigh){
                    for(var i = 0; i < data.size() - 1; ++i){
                        if(data.get(i).getFCost() > data.get(i + 1).getFCost()){
                            tempNode = data.get(i);
                            data.remove(i);
                            data.add(i + 1, data);
                            Switch = 1;
                        }
                    }
                } else if(this.highToLow){
                    for(var i = 0; i < data.size() - 1; ++i){
                        if(data.get(i).getFCost() < data.get(i + 1).getFCost()){
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
}
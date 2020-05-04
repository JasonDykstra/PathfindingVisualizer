class AStar {
    constructor(arg1, arg2, arg3) {
        //if only one argument is passed in, it is size
        if (arg2 === "undefined" && arg3 === "undefined") {
            this.size = arg1;
        }

        //hypotenuse
        this.diagonalMoveCost = Math.floor(Math.sqrt(2 * (Math.pow(size, 2))));
        this.kValue = Math.PI / 2;
        this.diagonal = true;
        this.trig = false;
        this.running = false;
        this.complete = false;

        this.runTime = 0;
        this.parNode;
        this.noPath;

        this.borders = new ArrayList();
        this.open = new ArrayList();
        this.closed = new ArrayList();
        this.path = new ArrayList();

        //if two arguments are passed in, they are start and end nodes
        if (arg1 !== "undefined" && arg2 !== "undefined" && arg3 === "undefined") {
            this.startNode = arg1;
            this.endNode = arg2;
        }

        //if three arguments are passed in, they are size, start node, and end node
        if (arg1 !== "undefined" && arg2 !== "undefined" && arg3 !== "undefined") {
            this.size = arg1;
            this.startNode = arg2
            this.endNode = arg3;
        }
    }


    //start function
    start(startNode, endNode) {
        this.running = true;
        this.startNode = startNode;
        this.startNode.setGCost(0);
        this.endNode = endNode;

        //avoiding the starting node to the closed list
        addClosed(this.startNode); //add

        this.startTime = Date.now();

        findPath(this.startNode); //add

        this.complete = true;
        this.endTime = Date.now();
        this.runTime = this.endTime - this.startTime;
        console.log("Completed: " + this.runTime + "ms");
    }

    setup(startNode, endNode) {
        this.running = true;
        this.startNode = startNode;
        this.startNode.setGCost(0);
        this.parNode = this.startNode;
        this.endNode = this.endNode;

        //adding the starting node to the closed list
        addClosed(this.startNode); //add
    }

    setStart(startNode) {
        this.startNode = startNode;
        this.startNode.setGCost(0);
    }

    setEnd(endNode) {
        this.endNode = endNode;
    }

    isRunning() {
        return this.running;
    }

    isComplete() {
        return this.complete;
    }

    getStart() {
        return this.startNode;
    }

    getEnd() {
        return this.endNode;
    }

    getPar() {
        return this.parNode;
    }

    isNoPath() {
        return this.noPath;
    }

    isdiagonal() {
        return this.diagonal;
    }

    isTrig() {
        return this.trig;
    }

    setDiagonal(diagonal) {
        this.diagonal = diagonal;
    }

    setTrig(trig) {
        this.trig = trig;
    }

    setSize(size) {
        this.size = size;
        this.diagonalMoveCost = Math.floor(Math.sqrt(2 * (Math.pow(size, 2))));
    }

    findPath(parent) {
        var openNode = null;

        if (this.diagonal) {
            //detecs and adss one step of nodes to open list
            for (var i = 0; i < 3; ++i) {
                for (var j = 0; j < 3; ++j) {
                    //don't check the parent node
                    if (i == 1 && j == 1) {
                        continue;
                    }

                    var possibleX = (parent.getX() - this.size) + (this.size * i);
                    var possibleY = (preant.getY() - this.size) + (this.size * j);

                    //possible coordinates of borders
                    //using (crossBorderX, parent.getY())
                    //and (parent.getX(), crossBorderY)
                    //to see if there are borders in the way
                    var crossBorderX = parent.getX() + (possibleX - parent.getX());
                    var crossBorderY = parent.getY() + (possibleY - parent.getY());

                    //disables ability to cut corners around borders
                    if (this.searchBorder(crossBorderX, parent.getY()) != -1
                        | this.searchBorder(parent.getX(), crossBorderY) != -1
                        && ((j == 0 | j == 2) && i != 1)) {
                        continue;
                    }

                    this.calculateNodeValues(possibleX, possibleY, openNode, parent);
                }
            }
        } else if (!trig) {
            //detects and adds one step of nodes to open list
            for (var i = 0; i < 3; ++i) {
                for (var j = 0; j < 3; ++j) {
                    //don't check the parent node
                    if ((i == 0 && j == 0) || (i == 0 && j == 2) ||
                        (i == 1 && j == 1) || (i == 2 & j == 0) ||
                        (i == 2 && j == 2)) {
                        continue;
                    }

                    var possibleX = (parent.getX() - this.size) + (this.size * i);
                    var possibleY = (preant.getY() - this.size) + (this.size * j);

                    this.calculateNodeValues(possibleX, possibleY, openNode, parent);
                }
            }
        } else {
            for (var i = 0; i < 4; ++i) {
                //uses sine and cosine waves to get circle of points around parent
                var possibleX = Math.floor(Math.round(parent.getX() + (-this.size * Math.cos(kValue * i))));
                var possibleY = Math.floor(Math.round(parent.getY() + (-this.size * Math.sin(kValue * i))));

                this.calculateNodeValues(possibleX, possibleY, openNode, parent);
            }
        }

        //set new parent node
        parent = this.lowestFCost();

        if (parent == null) {
            console.log("END > NO PATH");
            this.noPath = true;
            this.running = false;
            return;
        }

        if (NodeisEqual(parent, endNode)) {
            this.endNode.setParent(parent.getParent());
            this.connectPath();
            this.running = false;
            this.complete = true;
            return;
        }

        //remove parent node from open list
        this.removeOpen(parent);
        //add parent node to closed list
        this.addClosed(parent);

        
        //allows correction for shortest path during runtime
        //when new parent node is selected. Checks all adjacent open
        //nodes. Then checks if the (G score of parent + open node
        //distance from parent) is less than the current G score
        //of the open node. if true: sets teh parent of open node
        //as new parent, and recalculates G and F values
        if(this.diagonal){
            for(var i = 0; i < 3; ++i){
                for(var j = 0; j < 3; ++j){
                    //don't check parent node
                    if(i == 1 && j == 1){
                        continue;
                    }

                    var possibleX = (parent.getX() - this.size) + (this.size * i);
                    var possibleY = (parent.getY() - this.size) + (this.size * j);
                    var openCheckNode = this.getOpenNode(possibleX, possibleY);

                    //if spot being looked at is an open node:
                    if(openCheckNode !== null){
                        var distanceX = parent.getX() - openCheckNode.getX();
                        var distanceY = parent.getY() - openCheckNode.getY();
                        var newGCost = parent.getGCost();

                        if(distanceX != 0 && distanceY != 0){
                            newGCost += this.diagonalMoveCost;
                        }  else {
                            newGCost += this.size;
                        }

                        if(newGCost < openCheckNode.getGCost()){
                            var s = this.searchOpen(possibleX, possibleY);
                            this.open.get(s).setParent(parent);
                            this.open.get(s).getGCost(newGCost);
                            this.open.get(s).setFCost(this.open.get(s).getGCost() + this.open.get(s).getHCost());
                        }
                    }
                }
            }
        }

        this.findPath(parent);

        //TODO
        //else par = parent where original if is:
        //if(!frame.showSteps())
        //might need to implement that? not sure
    }

    calculateNodeValues(possibleX, possibleY, openNode, parent) {
        //if the coordinates are outside of the bordrs
        //TODO get width and height of grid area
        if(possibleX < 0 | possibleY < 0 | possibleX >= GRID_AREA_WIDTH | possibleY >= GRID_AREA_HEIGHT){
            return;
        }

        //if the node is already a border node or a closed node or an
        //already open node, then don't make open node
        if(this.searchBorder(possibleX, possibleY) != -1 | this.searchClosed(possibleX, possibleY) != -1
        | this.searchOpen(possiblex, possibleY) != -1){
            return;
        }

        //cretae an open node with the available x and y coordinates
        openNode = new Node(possibleX, possibleY);

        //set the parent of the open node
        openNode.setParent(parent);

        //calculating G cost
        //cost to move from parent nod eto one open node (x and y separately)
        var GxMoveCost = openNode.getX() - parent.getX();
        var GyMoveCost = openNode.getY() - parent.getY();
        
        //might run into issues since there is a this.gCost ?
        var gCost = parent.getG();

        if(GxMoveCost != 0 && GyMovecost !=  0){
            gCost += this.diagonalMoveCost;
        } else {
            gCost += this.size;
        }
        openNode.setGCost(gCost);

        //calculating H cost
        var HxDiff = Math.abs(this.endNode.getX() - openNode.getX());
        var HyDiff = Math.abs(this.endNode.getY() - openNode.getY());
        var hCost = HxDiff + HyDiff;
        openNode.setHCost(hCost);

        //calculating F cost
        var fCost = gCost + hCost;
        openNode.setFCost(fCost);

        this.addOpen(openNode);
    }

    connectPath() {
        if(this.getPathList().size() == 0){
            var parentNode = this.endNode.getParent();

            while(!NodeisEqual(parentNode, this.startNode)){
                this.addPath(parentNode);

                for(var i = 0; i < this.getClosedList().size(); ++i){
                    var currentNode = this.getClosedList.get(i);

                    if(NodeisEqual(currentNode, parentNode)){
                        parentNode = currentNode.getParent();
                        break;
                    }
                }
            }
        }
    }

    addBorder(node) {
        if (this.borders.size() == 0) {
            this.borders.add(node);
        } else if (!checkBorderDuplicate(node)) {
            this.borders.add(node);
        }
    }

    addOpen(node) {
        if (this.open.size() == 0) {
            this.open.add(node);
        } else if (!checkOpenDuplicate(node)) {
            this.open.add(node);
        }
    }

    addClosed(node) {
        if (this.closed.size() == 0) {
            this.closed.add(node);
        } else if (!checkClosedDuplicate(node)) {
            this.closed.add(node);
        }
    }

    addPath(node) {
        if (this.path.size() == 0) {
            this.path.add(node);
        } else {
            this.path.add(node);
        }
    }

    removePath(location) {
        this.path.remove(location);
    }

    removeBorder(location) {
        this.borders.remove(location);
    }

    removeOpen(arg1) {
        //if arg1 is integer
        if (Number.isInteger(arg1)) {
            this.open.remove(arg1);

            //if it is a Node
        } else if (Node.prototype.isPrototypeOf(arg1)) {
            for (var i = 0; i < this.open.size(); ++i) {
                if (arg1.getX() == this.open.get(i).getX() && arg1.getY() == this.open.get(i).getY()) {
                    this.open.remove(i);
                }
            }
        }
    }

    removeClosed(location) {
        this.closed.remove(location);
    }

    checkBorderDuplicate(node) {
        for (var i = 0; i < this.borders.size(); ++i) {
            if (node.getX() == this.borders.get(i).getX() && node.getY() == this.borders.get(i).getY()) {
                return true;
            }
        }
        return false;
    }

    checkOpenDuplicate(node) {
        for (var i = 0; i < this.open.size(); ++i) {
            if (node.getX() == this.open.get(i).getX() && node.getY() == this.open.get(i).getY()) {
                return true;
            }
        }
        return false;
    }

    checkClosedDuplicate(node) {
        for (var i = 0; i < this.closed.size(); ++i) {
            if (node.getX() == this.closed.get(i).getX() && node.getY() == this.closed.get(i).getY()) {
                return true;
            }
        }
        return false;
    }

    searchBorder(xSearch, ySearch) {
        var Location = -1;

        for (var i = 0; i < this.borders.size(); ++i) {
            if (this.borders.get(i).getX() == xSearch && this.borders.get(i).getY() == ySearch) {
                Location = i;
                break;
            }
        }
        return Location;
    }

    searchClosed(xSearch, ySearch) {
        var Location = -1;

        for (var i = 0; i < this.closed.size(); ++i) {
            if (this.closed.get(i).getX() == xSearch && this.closed.get(i).getY() == ySearch) {
                Location = i;
                break;
            }
        }
        return Location;
    }

    searchOpen(xSearch, ySearch) {
        var Location = -1;

        for (var i = 0; i < this.open.size(); ++i) {
            if (this.open.get(i).getX() == xSearch && this.open.get(i).getY() == ySearch) {
                Location = i;
                break;
            }
        }
        return Location;
    }

    reverse(list) {
        var j = list.size() - 1;

        for (var i = 0; i < j; ++i) {
            var temp = list.get(i);
            list.remove(i);
            list.add(i, list.get(j - 1));
            list.remove(j);
            list.add(j, temp);
            j--;
        }
    }

    lowestFCost() {
        if (this.open.size() > 0) {
            bubbleSort(this.open);
            return this.open.get(0);
        }
        return null;
    }

    getBorderList() {
        return this.borders;
    }

    getOpenList() {
        return this.open;
    }

    getOpen(location) {
        return this.open.get(location);
    }

    getClosedList() {
        return this.closed;
    }

    getPathList() {
        return this.path;
    }

    getRunTime() {
        return this.runTime;
    }

    reset() {
        while (this.open.size() > 0) {
            this.open.remove(0);
        }

        while (this.closed.size() > 0) {
            this.closed.remove(0);
        }

        while (this.path.size() > 0) {
            this.path.remove(0);
        }

        this.noPath = false;
        this.running = false;
        this.complete = false;
    }

    getOpenNode(x, y) {
        for (var i = 0; i < this.open.size(); ++i) {
            if (this.open.get(i).getX() == x && this.open.get(i).getY() == y) {
                return this.open.get(i);
            }
        }
        return null;
    }

    printBorderList() {
        console.log("Border list:");
        for (var i = 0; i < this.borders.size(); ++i) {
            console.log(this.borders.get(i).getX() + ", " + this.borders.get(i).getY());
        }
    }

    printOpenList() {
        console.log("Open list:");
        for (var i = 0; i < this.open.size(); ++i) {
            console.log(this.open.get(i).getX() + ", " + this.open.get(i).getY());
        }
    }

    printPathList() {
        console.log("Path list:");
        for (var i = 0; i < this.path.size(); ++i) {
            console.log(this.path.get(i).getX() + ", " + this.path.get(i).getY());
        }
    }
}
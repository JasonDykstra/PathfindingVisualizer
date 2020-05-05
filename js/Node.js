class Node{

    constructor(row, col){
        this.row = row;
        this.col = col;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.previousNode;
        this.parent;
        this.start = false;
        this.end = false;
        this.wall = false;
        this.visited = false;
        this.distance = Infinity;
        this.shortestPath = false;
    }

    getRow(){
        return this.row;
    }

    getCol(){
        return this.col;
    }

    getGCost(){
        return this.gCost;
    }

    getHCost(){
        return this.hCost;
    }

    getFCost(){
        return this.fCost;
    }

    getPreviousNode(){
        return this.previousNode;
    }

    getParent(){
        return this.parent;
    }

    isStart(){
        return this.start;
    }

    isEnd(){
        return this.end
    }

    isWall(){
        return this.wall;
    }

    isVisited(){
        return this.visited;
    }

    isShortestPath(){
        return this.shortestPath;
    }

    getDistance(){
        return this.distance;
    }

    setRowCol(row, col){
        this.row = row;
        this.col = col;
    }

    setGCost(gCost){
        this.gCost = gCost;
    }

    setHCost(hCost){
        this.hCost = hCost;
    }

    setFCost(fCost){
        this.fCost = fCost;
    }

    setPreviousNode(previousNode){
        this.previousNode = previousNode;
    }

    setParent(parent){
        this.parent = parent;
    }

    setStart(start){
        this.start = start;
    }

    setEnd(end){
        this.end = end;
    }

    setWall(wall){
        this.wall = wall;
    }

    setVisited(visited){
        this.visited = visited;
    }
    
    setDistance(distance){
        this.distance = distance;
    }

    setShortestPath(shortestPath){
        this.shortestPath = shortestPath;
    }
}

function NodeisEqual(start, end){
    if(start.getrow() == end.getrow() && start.getcol() == end.getcol()){
        return true;
    }
    return false;
}

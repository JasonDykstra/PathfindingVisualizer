class Node{

    constructor(x, y){
        this.x = x;
        this.y = y;
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
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
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

    getDistance(){
        return this.distance;
    }

    setXY(x, y){
        this.x = x;
        this.y = y;
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
}

function NodeisEqual(start, end){
    if(start.getX() == end.getX() && start.getY() == end.getY()){
        return true;
    }
    return false;
}

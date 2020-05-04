class Node{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.parent;
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

    getParent(){
        return this.parent;
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

    setParent(parent){
        this.parent = parent;
    }

    
}

function NodeisEqual(start, end){
    if(start.getX() == end.getX() && start.getY() == end.getY()){
        return true;
    }
    return false;
}

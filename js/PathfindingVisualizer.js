
//animates the path from start to end node
function animateShortestPath(nodesInShortestPathOrder){
    for(let i = 0; i < nodesInShortestPathOrder.length; ++i){
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            GRID[node.getRow()][node.getCol()].setShortestPath(true);
            drawGrid();
        }, ANIMATION_DELAY * 3 * i);
    }
}

//main animation method that animates the visited nodes, or the process of the pathfinding algorithm
function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
    console.log("Calling animate Dijkstra...");
    for(let i = 0; i <= visitedNodesInOrder.length; ++i){
        if(i === visitedNodesInOrder.length - 1){
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, ANIMATION_DELAY * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            GRID[node.getRow()][node.getCol()].setVisited(true);
            drawGrid();
        }, ANIMATION_DELAY * i);
    }
}

//function that calls the main animate function
//resets nodes set as visited by pathfinding algorithm to unvisited, so the 
//animation can work properly by setting nodes to visited over a time interval
function visualizeDijkstra(){
    const visitedNodesInOrder = dijkstra(GRID, START_NODE, END_NODE);

    //have to set visited to false for all visited nodes in order so that we can animate them
    resetVisitedNodesInOrder(visitedNodesInOrder);

    //stalling here for some reason if i try to run the algorithm more than once
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(END_NODE);

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}

//event listener for "find path" button
document.getElementById("findPath").addEventListener("click", function (event) {
    console.log("finding path...");
    visualizeDijkstra();
});

//helper function to reset the visited status of all nodes
function resetVisitedNodesInOrder(visitedNodesInOrder){
    for(let i = 0; i < visitedNodesInOrder.length; ++i){
        visitedNodesInOrder[i].setVisited(false);
    }
}
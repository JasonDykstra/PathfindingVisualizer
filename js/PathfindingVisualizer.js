const animationDelay = 20;


function animateShortestPath(nodesInShortestPathOrder){
    for(let i = 0; i < nodesInShortestPathOrder.length; ++i){
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            GRID[node.getX()][node.getY()].setShortestPath(true);
            drawGrid();
        }, animationDelay * 3 * i);
    }
}

function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
    console.log("Calling animate Dijkstra...");
    for(let i = 0; i <= visitedNodesInOrder.length; ++i){
        if(i === visitedNodesInOrder.length - 1){
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, animationDelay * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            GRID[node.getX()][node.getY()].setVisited(true);
            drawGrid();
        }, animationDelay * i);
    }
}


function visualizeDijkstra(){
    const visitedNodesInOrder = dijkstra(GRID, START_NODE, END_NODE);
    console.log("Visited nodes list is: " + visitedNodesInOrder);

    //have to set visited to false for all visited nodes in order so that we can animate them
    resetVisitedNodesInOrder(visitedNodesInOrder);

    //stalling here for some reason if i try to run the algorithm more than once
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(END_NODE);
    console.log("Shortest Path Nodes list is: " + nodesInShortestPathOrder);

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}


document.getElementById("findPath").addEventListener("click", function (event) {
    console.log("finding path...");
    visualizeDijkstra();
});

function resetVisitedNodesInOrder(visitedNodesInOrder){
    console.log("Resetting visited nodes in order!");
    for(let i = 0; i < visitedNodesInOrder.length; ++i){
        visitedNodesInOrder[i].setVisited(false);
    }
}
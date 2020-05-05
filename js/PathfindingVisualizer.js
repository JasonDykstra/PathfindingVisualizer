const animationDelay = 100;


function animateShortestPath(nodesInShortestPathOrder){
    for(let i = 0; i < nodesInShortestPathOrder.length; ++i){
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            GRID[node.getX()][node.getY()].setShortestPath(true);
            drawGrid();
        }, animationDelay * 5 * i);
    }
}

function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
    for(let i = 0; i <= visitedNodesInOrder.length; ++i){
        console.log("i = " + i + " and visitednodeslengthwhatever is " + visitedNodesInOrder.length);
        if(i === visitedNodesInOrder.length - 1){
            console.log("i = visitedNodesinorder.length!");
            setTimeout(() => {
                animeShortestPath(nodesInShortestPathOrder);
            }, animationDelay * i);
            return;
        }
        console.log("we made it!");
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            GRID[node.getX()][node.getY()].setVisited(true);
            drawGrid();
        }, animationDelay * i);
    }
}

function visualizeDijkstra(){
    const visitedNodesInOrder = dijkstra(GRID, START_NODE, END_NODE);
    console.log("Visited nodes in order... (main tab)" + visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(END_NODE);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}

document.getElementById("findPath").addEventListener("click", function (event) {
    visualizeDijkstra();
});
class DijkstraVisualization {

    constructor() {

    }

    //animates the path from start to end node
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; ++i) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                GRID[node.getRow()][node.getCol()].setShortestPath(true);
                drawGrid();

                //after the last node is draw, set state to finished
                if (i == nodesInShortestPathOrder.length - 1) {
                    STATE = "finished";
                }
            }, ANIMATION_DELAY * 2 * i);
        }
    }

    //main animation method that animates the visited nodes, or the process of the pathfinding algorithm
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        console.log("Calling animate Dijkstra...");
        for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
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
    visualizeDijkstra() {
        const visitedNodesInOrder = dijkstra(GRID, START_NODE, END_NODE);
        console.log("num visited nodes in order: " + visitedNodesInOrder.length);

        //stalling here for some reason if i try to run the algorithm more than once
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(END_NODE);

        //have to set visited to false for all visited nodes in order so that we can animate them
        resetNodes();

        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
}
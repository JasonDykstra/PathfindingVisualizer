/*
Modification of code from https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial/blob/master/src/algorithms/dijkstra.js
*/

//returns a list of visited nodes in order
function dijkstra(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        //pops the first node off the list, which is the closest
        const closestNode = unvisitedNodes.shift();
        //if we get to a wall, skip it
        if (closestNode.isWall()) continue;
        //if closest node is at distance of infinity,
        //it means we are trapped and have to stop     //this is where we're stopping
        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }

        closestNode.setVisited(true);
        visitedNodesInOrder.push(closestNode);
        if (closestNode === endNode) {
            return visitedNodesInOrder;
        }
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort(
        (nodeA, nodeB) => nodeA.getDistance() - nodeB.getDistance()
    );
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.setDistance(node.getDistance() + 1);
        neighbor.setPreviousNode(node);
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const col = node.getY();
    const row = node.getX();

    //north
    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }
    //south
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col]);
    }
    //west
    if (col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    //east
    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1]);
    }
    return neighbors.filter((neighbor) => neighbor.isVisited() == false);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

//backtracks from the end node to find the shortest path
//only work when called after the dijkstra method above
function getNodesInShortestPathOrder(endNode) {
    console.log("Getting nodes in shortest path...");
    console.log("Type of end node passed into shortestPathOrder function is: " + typeof(endNode));
    console.log("Type of previous node: " + typeof(endNode.getPreviousNode()));
    console.log("Coordinates of previous node: " + endNode.getPreviousNode().getX() + ", " + endNode.getPreviousNode().getY());
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    //while (typeof(currentNode) !== "undefined") {
    while(currentNode !== START_NODE){
        console.log("Adding node " + currentNode.getX() + ", " + currentNode.getY() + " to list");
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.getPreviousNode();
    }
    return nodesInShortestPathOrder;
}

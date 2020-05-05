function dijkstra(grid, startNode, endNode){
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        //pops the first node off the list, which is the closest
        const closestNode = unvisitedNodes.shift();
        //if we get to a wall, skip it
        if(closestNode.isWall) continue;
        //if closest node is at distance of infinity,
        //it means we are trapped and have to stop
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.setVisited(true);
        visitedNodesInOrder.push(closestNode);
        if(closestNode === endNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.getDistance() - nodeB.getDistance());
}

function updateUnvisitedNeighbors(node, grid){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for(const neighbor of unvisitedNeighbors){
        neighbor.setDistance(node.getDistance() + 1);
        neighbor.setPreviousNode(node);
    }
}

function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node; //? will that work
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited());
}

function getAllNodes(grid){
    const nodes = [];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

//backtracks from the end node to find the shortest path
//only work when called after the dijkstra method above
function getNodesInShortestPathOrder(endNode){
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while(currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.getPreviousNode();
    }
    return nodesInShortestPathOrder;
}
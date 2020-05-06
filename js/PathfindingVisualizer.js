dijkstraVisualizer = new DijkstraVisualization();

function visualize(){
    dijkstraVisualizer.visualizeDijkstra();
}



//helper function to reset the visited status of all nodes
function resetNodes() {
    for (let i = 0; i < GRID.length; ++i) {
        for (let j = 0; j < GRID[0].length; ++j) {
            GRID[i][j].setVisited(false);
            GRID[i][j].setShortestPath(false);
        }
    }
}

function setState(state){
    STATE = state;

    //grey out buttons to show they are unusable while visualiztion is happening
    if(state == "visualize"){
        changeButtonBackgrounds("#666666");
    } else if(state == "draw"){
        changeButtonBackgrounds("green");
    }
}
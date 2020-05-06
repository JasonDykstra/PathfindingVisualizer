/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
    document.getElementById("algorithmsDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropButton')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//Event Listeners

//buttons
document.getElementById("placeStartNode").addEventListener("click", function (event) {
    if(STATE == "draw")
        placeStartNode();
});

document.getElementById("placeEndNode").addEventListener("click", function (event) {
    if(STATE == "draw")
        placeEndNode();
});

//event listener for "find path" button
document.getElementById("findPath").addEventListener("click", function (event) {
    STATE = "visualize";
    console.log("finding path...");
    visualize();
});
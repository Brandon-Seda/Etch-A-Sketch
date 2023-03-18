const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let black = "#000000";
let white = "#FFFFFF";
let color = DEFAULT_COLOR;

let penActive = false;

const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector("#clear");
const blackBtn = document.querySelector("#black");
const randomBtn = document.querySelector("#random");
const fillBtn = document.querySelector("#fill");
const gridSizeBtn = document.querySelector("#gridSizeBtn");

let gridSize = document.getElementById("gridSize");
console.log(gridSize.value);

function changeGridSize() {
  if (gridSize.value <= 0 || gridSize.value > 100) {
    alert("Invalid grid size!");
  } else {
    createGrid(gridSize.value);
  }
}

clearBtn.addEventListener("click", clearGrid);

blackBtn.addEventListener("click", function () {
  console.log("black button clicked");
  color = black;
});
randomBtn.addEventListener("click", function () {
  console.log("random button clicked");
  getRandomColor();
});

fillBtn.addEventListener("click", function () {
  fillAll();
});

let cells = [];

//creates divs based on grid size or creates a default 16x16, removes all child nodes before creation
function createGrid(size) {
  gridContainer.innerHTML = "";

  let gridTotal = size * size;

  gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0,1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr`;
  // gridContainer.style.gridGap = ('.5px');

  for (let i = 0; i < gridTotal; i++) {
    cells[i] = document.createElement("div");
    cells[i].classList.add("box");
    cells[i].addEventListener("mouseover", draw)
    cells[i].addEventListener("click", function(){
      if(!penActive) {activatePen()}
      else {disablePen()}
    });

    gridContainer.appendChild(cells[i]);
  }
}

//draws if pen is active
function draw(e) {
  if(penActive){
    e.target.style.background = color;
  }
}

//activates pen
function activatePen(){
  penActive = true;
}

//deactivates pen
function disablePen(){
  penActive = false;
}

//fills all squares
function fillAll() {
  cells.forEach((item) => {
    item.style.background = color;
  });
}

//clears the screen on button click
function clearGrid() {
  cells.forEach((item) => {
    item.style = "background-color: #FFFFFF";
  });
}

function getRandomColor() {
  let opt1 = Math.floor(Math.random() * 256);
  let opt2 = Math.floor(Math.random() * 256);
  let opt3 = Math.floor(Math.random() * 256);

  console.log(opt1, opt2, opt3);

  color = `rgb(${opt1},${opt2},${opt3})`;
  randomBtn.style.background = color;
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
};

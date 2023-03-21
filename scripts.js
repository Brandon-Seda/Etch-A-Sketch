const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let color = DEFAULT_COLOR;

let penActive = false;

const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector("#clear");
const colorPicker = document.querySelector("#colorPicker");
const randomBtn = document.querySelector("#random");
const fillBtn = document.querySelector("#fill");
const sliderValue = document.querySelector("#sliderValue")
const sizeSlider = document.querySelector("#sizeSlider");

let gridSize = document.getElementById("gridSize");

colorPicker.oninput = (e) => color = e.target.value;
sizeSlider.onmousemove = (e) => updateSliderValue(e.target.value);
sizeSlider.onchange = (e) => changeGridSize(e.target.value);

clearBtn.addEventListener("click", clearGrid);

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

function changeGridSize(value){
  gridSize = value;
  updateSliderValue(value);
  updateGrid();
}

function updateSliderValue(value){
  sliderValue.innerHTML = `${value} x ${value}`;
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
  gridContainer.innerHTML = ""
}

function getRandomColor() {
  let opt1 = Math.floor(Math.random() * 256);
  let opt2 = Math.floor(Math.random() * 256);
  let opt3 = Math.floor(Math.random() * 256);

  console.log(opt1, opt2, opt3);

  color = `rgb(${opt1},${opt2},${opt3})`;
  randomBtn.style.background = color;
}

function updateGrid(){
  clearGrid();
  createGrid(gridSize);
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
};

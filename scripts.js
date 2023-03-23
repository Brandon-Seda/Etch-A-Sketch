const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let color = DEFAULT_COLOR;

let penActive = false;
let activeButton = false;

const gridContainer = document.querySelector(".grid-container");

const clearBtn = document.querySelector("#clear");
const colorPicker = document.querySelector("#colorPicker");
const rainbowBtn = document.querySelector("#rainbow");
const fillBtn = document.querySelector("#fill");

const sliderValue = document.querySelector("#sliderValue")
const sizeSlider = document.querySelector("#sizeSlider");

let gridSize = document.getElementById("gridSize");

colorPicker.oninput = (e) => color = e.target.value;
sizeSlider.onmousemove = (e) => updateSliderValue(e.target.value);
sizeSlider.onchange = (e) => changeGridSize(e.target.value);

clearBtn.addEventListener("mousedown", clearGrid);

rainbowBtn.addEventListener("mousedown", function () {
  if(activeButton == false){
    activeButton = true;
    getRainbow();
  } else {
    activeButton = false;
  }
});

fillBtn.addEventListener("mousedown", function () {
  fillAll();
});

let cells = [];

//creates grid based on given value, defaults to 16x16, removes all child nodes before creation
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
    cells[i].addEventListener("mousedown", function(){
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
  cells.forEach((cell) => {
    cell.style.background = color;
  });
}

//clears the screen on button click
function clearGrid() {
  gridContainer.innerHTML = ""
}

//returns a random color
function getRainbow() {

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  color = `rgb(${r},${g},${b})`;

  return color;
}

function updateGrid(){
  clearGrid();
  createGrid(gridSize);
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
};

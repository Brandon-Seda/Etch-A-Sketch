const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = 'draw'

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let gridSize = DEFAULT_SIZE;

const gridContainer = document.querySelector(".grid-container");
const drawBtn = document.getElementById("drawbtn");
const clearBtn = document.getElementById("clearbtn");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById("rainbowbtn");
const eraseBtn = document.getElementById('erasebtn');
let sliderValue = document.getElementById("sliderValue")
const sizeSlider = document.getElementById("sizeSlider");


colorPicker.oninput = (e) => color = setCurrentColor(e.target.value);
sizeSlider.onmousemove = (e) => updateSliderValue(e.target.value);
sizeSlider.onchange = (e) => changeGridSize(e.target.value);
clearBtn.onclick = () => updateGrid();
drawBtn.onclick = () => setCurrentMode('draw');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraseBtn.onclick = () => setCurrentMode('erase');


let mouseDown = false; 
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentMode(mode){
  activateButton(mode);
  currentMode = mode;
}

function setCurrentColor(nextColor){
  currentColor = nextColor;
}

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
    cells[i].addEventListener("mouseover", drawing)
    cells[i].addEventListener("mousedown", drawing)
    
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

//adds functionality to buttons
function drawing(e) {
  if(e.type === 'mouseover' && !mouseDown) return
  if(currentMode === 'rainbow') {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    e.target.style.backgroundColor = (`rgb(${r},${g},${b})`) ;
  } 
  else if (currentMode === 'draw'){
    e.target.style.backgroundColor = currentColor;
  }
  else if(currentMode === 'erase') {
    e.target.style.backgroundColor = '#FFFFFF'
  }
}

//clears the screen on button click
function clearGrid() {
  gridContainer.innerHTML = "";
}

//checks whethere button is active or not 
function activateButton(mode) {
  if(currentMode === 'fill') {
    fillBtn.classList.remove('active');
  } else if(currentMode === 'rainbow'){
    rainbowBtn.classList.remove('active');
  } else if(currentMode === 'erase') {
    eraseBtn.classList.remove('active');
  } else {
    drawBtn.classList.remove('active');
  }

  if(mode === 'fill') {
    fillBtn.classList.add('active');
  } else if(mode === 'rainbow'){
    rainbowBtn.classList.add('active');
  } else if(mode === 'erase') {
    eraseBtn.classList.add('active');
  } else {
    drawBtn.classList.add('active');
  }
}

function updateGrid(){
  clearGrid();
  createGrid(gridSize);
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};

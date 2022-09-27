const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';

let black = '#000000';
let white = '#FFFFFF';
let color = DEFAULT_COLOR;


const gridContainer =  document.querySelector('.grid-container'); 
const clearBtn = document.querySelector('#clear');
const blackBtn = document.querySelector('#black');
const whiteBtn = document.querySelector('#white');
const gridSizeBtn = document.querySelector('#gridSizeBtn');

let gridSize = document.getElementById('gridSize');  
console.log(gridSize.value);

function changeGridSize(){    
    if(gridSize.value <= 0 || gridSize.value > 100){
        alert("Invalid grid size!");
    } else {
        createGrid(gridSize.value);
    }
}

clearBtn.addEventListener('click', clearGrid);

blackBtn.addEventListener('click', function(){
    console.log("black button clicked");
    color = black;

});
whiteBtn.addEventListener('click', function(){
    console.log("white button clicked");
    color = white;
});

let cells = []



//creates divs based on grid size or creates a default 16x16
function createGrid(size){
    clearGrid();

    let cellTotal = size * size;

    gridContainer.style.gridTemplateColumns = (`repeat(${size}, 1fr`);
    gridContainer.style.gridTemplateRows = (`repeat(${size}, 1fr`);
    gridContainer.style.gridGap = ('.5px');

    for(let i=0; i < cellTotal; i++){
  
        cells[i] = document.createElement('div');
        cells[i].classList.add('box');
        cells[i].addEventListener('mouseover', draw);
        cells[i].addEventListener('click', clearCell);
        
        gridContainer.appendChild(cells[i]);
    }
}

//changes grid box color based on event happening
function draw(e){
    e.target.style.background = color; 
}

//clears the screen on button click
function clearGrid(){
    cells.forEach(item => {
        item.style = 'background-color: #FFFFFF';
    });

}

//on mouse click clears a cell
function clearCell(e){
    e.target.style.background = white;
}

window.onload = () =>{
 createGrid(DEFAULT_SIZE);
}